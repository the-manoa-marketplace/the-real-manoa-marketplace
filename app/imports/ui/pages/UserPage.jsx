import React from 'react';
import {Container, Card, Row, Col, ListGroup} from 'react-bootstrap';
import { TextField } from 'uniforms-bootstrap5';
const User_Page = () => {

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ width: '30rem' }} className="d-flex align-items-center justify-content-center">
        <Card.Img variant="top" src="https://www.pngplay.com/wp-content/uploads/2/Patrick-Star-PNG-Background.png" style={{width:'50%', height: 'auto'}}/>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Card.Text className={'mb-2 text-muted'}>
            Gunga gingan gunga gingan
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Patrick Star</ListGroup.Item>
          <ListGroup.Item>patrick.star@bikinibottom.com</ListGroup.Item>
          <ListGroup.Item>123-456-789</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="/MyListings">Listings</Card.Link>
          <Card.Link href="/EditUserPage">Edit Profile</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default User_Page;