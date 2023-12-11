import React, { useState } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Listings } from '../../api/listing/Listing';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Listings.schema);

/* Renders the EditStuff page for editing a single document. */
const EditListing = () => {
  const currentUserEmail = Meteor.user().emails[0].address;

  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Listings.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Listings.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const [images, setImages] = useState(doc.images || []);

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages([...images, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  console.log('owner id: ', doc.owner);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { listingTitle, price, description, condition, tags } = data;
    Listings.collection.update(_id, { $set: { listingTitle, price, description, condition, tags, images } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success').then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/mylistings';
      })));
  };

  // eslint-disable-next-line no-nested-ternary
  return ready ? (
    currentUserEmail.toString() === doc.owner.toString() ? (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Edit Listing</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col> <TextField name="listingTitle" /> </Col>
                    <Col> <NumField name="price" /> </Col>
                  </Row>
                  <Row>
                    <Col> <SelectField name="condition" /> </Col>
                    <Col> <SelectField name="tags" /></Col>
                  </Row>
                  <LongTextField name="description" />
                  {images.map((url, index) => (
                    <div key={index}>
                      <Image src={url} thumbnail />
                      <Button onClick={() => handleImageDelete(index)}>Delete</Button>
                    </div>
                  ))}
                  <input type="file" onChange={handleImageUpload} />
                  <SubmitField value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    ) : (
      swal('Error', 'You are not authorized to edit this listing', 'error').then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/home';
      })
    )
  ) : <LoadingSpinner />;
};

export default EditListing;
