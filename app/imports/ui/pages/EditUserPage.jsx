// imports/ui/pages/EditUserPage.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const EditUserPage = () => {
  const [name, setName] = useState('Patrick Star');
  const [email, setEmail] = useState('patrick.star@bikinibottom.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-789');

  const handleSave = () => {
    // Handle saving the edited user profile data
    console.log('TEST - [SAVED]');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ width: '30rem' }} className="d-flex align-items-center justify-content-center">
        <Card.Body>
          <Card.Title>Edit Profile</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditUserPage;
