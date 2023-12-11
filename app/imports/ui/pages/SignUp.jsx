import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row, Image, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/Profile/Profiles';
import CloudinaryUpload from "../services/CloudinaryUpload";

const UploadFile = ({ handleImagePreview }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImagePreview(file);
  };

  return (
      <div>
        <label htmlFor="fileInput">Upload Profile Picture:</label>
        <input type="file" id="fileInput" onChange={handleFileChange} />
      </div>
  );
};

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [pictureSelected, setPictureSelected] = useState(null);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    name: String,
    address: String,
    bio: String,
    picture: {
      type: String,
      optional: true,
    },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  const submit = async (doc) => {
    const { email, password, name, address, bio } = doc;

    if (!email.endsWith('@hawaii.edu')) {
      setError('Only emails ending with @hawaii.edu are allowed to register.');
    } else {
      // Additional logic for image upload if a picture is selected
      let uploadedPicture = '';
      if (pictureSelected) {
        uploadedPicture = await CloudinaryUpload.postImage(pictureSelected); // Replace with the actual image upload logic
      }

      // Insert profile into the Profiles collection
      Profiles.insertProfile(
          {
            name,
            address,
            description: bio,
            owner: email,
          },
          uploadedPicture
      );

      Accounts.createUser(
          { email, username: email, password, profile: { name, address, bio, picture: uploadedPicture } },
          (err) => {
            if (err) {
              setError(err.reason);
            } else {
              setError('');
              setRedirectToRef(true);
            }
          }
      );
    }
  };

  const handleImagePreview = (selectedFile) => {
    setPictureSelected(selectedFile);
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  return (
      <Container id="signup-page" className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h2 className="text-center">Register your account</h2>
            <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
              <Card>
                <Card.Body>
                  {/* Image upload component */}
                  <UploadFile handleImagePreview={handleImagePreview} />

                  {pictureSelected && (
                      <div>
                        <Image src={pictureSelected instanceof File ? URL.createObjectURL(pictureSelected) : pictureSelected} thumbnail />
                        <Button onClick={() => setPictureSelected(null)}>Delete </Button>
                      </div>
                  )}

                  <TextField name="name" placeholder="Full name" />
                  <TextField name="email" placeholder="Enter a UH email address" />
                  <TextField name="address" placeholder="Address" />
                  <LongTextField name="bio" placeholder="Enter a description" />
                  <TextField name="password" placeholder="Password" type="password" />

                  <ErrorsField />
                  <SubmitField />
                </Card.Body>
              </Card>
            </AutoForm>
            <Alert variant="light">
              Already have an account? Login <Link to="/signin">here</Link>
            </Alert>
            {error && (
                <Alert variant="danger">
                  <Alert.Heading>Registration was not successful</Alert.Heading>
                  {error}
                </Alert>
            )}
          </Col>
        </Row>
      </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

SignUp.defaultProps = {
  location: { state: {} },
};

export default SignUp;
