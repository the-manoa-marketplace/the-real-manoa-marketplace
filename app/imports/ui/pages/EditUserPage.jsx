import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/Profile/Profiles';

const EditUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [picture, setPicture] = useState('');

  // Fetch user profile data
  const { user } = useTracker(() => {
    const = Meteor.subscribe(Profiles.userPublicationName); // Replace with your publication name
    const user = Profiles.collection.findOne({ owner: Meteor.user().username });

    return { user };
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setBio(user.bio);
      setPicture(user.picture);
    }
  }, [user]);

  const handleSave = () => {
    // Update the user profile data in the database
    Profiles.collection.update(
        { owner: Meteor.user().username },
        { $set: { name, email, address, bio, picture } }
    );

    // Handle any additional logic after saving the edited user profile data
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

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPicture">
                <Form.Label>Profile Picture URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the URL for your profile picture"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
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
