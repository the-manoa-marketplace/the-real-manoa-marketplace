import React, { useState } from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Listings } from '../../api/listing/Listing';
import UploadFile from '../components/UploadFile.jsx';
import CloudinaryUpload from '../services/CloudinaryUpload';

const formSchema = new SimpleSchema({
  listingTitle: String,
  price: {
    type: Number,
    min: 0,
  },
  condition: {
    type: String,
    allowedValues: ['Factory New', 'Like New', 'Fair', 'Field-Tested'],
  },
  description: String,
  tags: {
    type: String,
    allowedValues: ['Apparel', 'Housewares', 'Vehicle', 'Electronics', 'Games', 'Other'],
  },
  images: {
    type: Array,
    optional: true,
  },
  'images.$': {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddListing = () => {
  const [imagesSelected, setImagesSelected] = useState([]);

  const handleImagePreview = (selectedFiles) => {
    setImagesSelected(selectedFiles);
  };

  const submit = async (data) => {
    const { listingTitle, price, condition, description, tags } = data;
    let images = [];
    console.log('this is being ran 1');
    if (imagesSelected.length > 0) {
      console.log('this is being ran 2');
      console.log(imagesSelected.length);
      images = await Promise.all(
        imagesSelected.map((image) => CloudinaryUpload.postImage(image)),
        console.log('this is being ran 3'),
      );
      console.log('uploaded images: ,', images);
    }
    const owner = Meteor.user().username;

    Listings.collection.insert(
      { listingTitle, price, condition, description, tags, owner, images },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success').then(() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = '/mylistings';
          });
        }
      },
    );
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Listing</h2></Col>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                {/* Form fields */}
                <TextField name="listingTitle" />
                <NumField name="price" />
                <SelectField name="condition" />
                <SelectField name="tags" />
                <LongTextField name="description" />

                {/* Image upload component */}
                <UploadFile handleImagePreview={handleImagePreview} />

                {imagesSelected.map((url, index) => (
                  <Image key={index} src={URL.createObjectURL(url)} thumbnail />
                ))}

                {/* Submit button and error handling */}
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddListing;
