import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import {Alert, Button, Card, Col, Container, Image, Row} from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import UploadFile from "../components/UploadFile";

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    fullName: String,
    address: String,
    description: String,
    Profile Picture: {
      type: Array,
      optional: true,
    },
    'images.$': {
      type: String,
      optional: true,
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    if (!email.endsWith('@hawaii.edu')) {
      setError('Only emails ending with @hawaii.edu are allowed to register.');
    } else {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          setError(err.reason);
        } else {
          setError('');
          setRedirectToRef(true);
        }
      });
    }
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5} >
          <h2 className="text-center">Register your account</h2>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="fullName" placeholder="Full name" />
                <TextField name="images" placeholder="Upload a profile picture" />
                <TextField name="email" placeholder="Enter a UH email address" />
                <TextField name="address" placeholder="Address" />
                <LongTextField name="description" placeholder="Description" />
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
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};

SignUp.defaultProps = {
  location: { state: {} },
};

export default SignUp;
