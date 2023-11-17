import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row, FormCheck } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return (<Navigate to="/" />);
  }

  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Login to your account</h2>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <FormCheck
                  type="checkbox"
                  label="Remember me"
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <ErrorsField />
                <SubmitField className="d-block mx-auto" />
              </Card.Body>
            </Card>
          </AutoForm>
          <div className="text-center">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <Alert variant="light" className="text-center">
            <Link to="/signup">Click here to Register</Link>
          </Alert>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              <p className="text-center">{error}</p>
            </Alert>
          )}
        </Col>
        {/* Optional: Second column for the image or welcome message */}
        {/* <Col md={6} className="signin-image">
          // Insert an image or a welcome message here
        </Col> */}
      </Row>
    </Container>
  );
};

export default SignIn;
