import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Listings } from '../../api/listing/Listing';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  listingTitle: String,
  price: Number,
  condition: {
    type: String,
    allowedValues: ['Factory New', 'Like New', 'Fair', 'Field-Tested'],
  },
  description: String,
  tags: {
    type: String,
    allowedValues: ['Apparel', 'Housewares', 'Vehicle', 'Electronics', 'Games', 'Other'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddListing = () => {

  // On submit, insert the data.
  const submit = (data /* , formRef */) => {
    const { listingTitle, price, condition, description, tags } = data;
    const owner = Meteor.user().username;
    Listings.collection.insert(
      { listingTitle, price, condition, description, tags, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success').then(() => {
            // eslint-disable-next-line no-restricted-globals
            location.href = '/mylistings';
          });
          // formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Listing</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
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
