import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';

const ItemsForSale = () => (
  <Container fluid>
    <Row>
      {/* Sidebar */}
      <Col xs={3}>
        <SideBar />
      </Col>
      {/* Content */}
      <Col xs={9} className="p-3">
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="d-flex align-items-center justify-content-start">
              <Card.Title>Za Pack</Card.Title>
              <Card.Text>Broccoli for sale - $50</Card.Text>
              <Card.Img
                variant="top"
                src="http://www.organicbiomama.com/wp-content/uploads/2016/04/2016-03-28-17.36.52.jpg"
                style={{ width: '85%', height: '150px' }}
              />
            </Card>
          </Col>
          {/* Add more Card components for other items */}
        </Row>
      </Col>
    </Row>
  </Container>
);

export default ItemsForSale;
