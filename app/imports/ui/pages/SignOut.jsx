import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();
  Meteor.logout();

  return (
    <Col id="signout-page" className="text-center py-3">
      <h2>You are signed out.</h2>
      <Button onClick={() => navigate('/signin')}>Sign In Again</Button>
      <Button variant="secondary" onClick={() => navigate('/')}>Return Home</Button>
    </Col>
  );
};

export default SignOut;
