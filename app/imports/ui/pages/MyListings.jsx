import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Listings } from '../../api/listing/Listing';
import ListingItem from '../components/ListingItem';
import LoadingSpinner from '../components/LoadingSpinner';
import SideBar from '../components/SideBar';

const MyListings = () => {
  const { ready, listings } = useTracker(() => {
    const subscription = Meteor.subscribe(Listings.userPublicationName);
    const rdy = subscription.ready();
    const listingItem = Listings.collection.find({}).fetch();
    return {
      listings: listingItem,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={3}>
          <SideBar />
        </Col>
        {/* Content */}
        <Col xs={9} className="py-3">
          <Row className="justify-content-center">
            <Col md={8}>
              <Col className="text-center">
                <h2>Your Listings</h2>
              </Col>
              <Row>
                {listings.map((listing) => (
                  <Col key={listing._id} md={4} className="mb-4">
                    <Card>
                      <Card.Body>
                        <ListingItem listing={listing} />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default MyListings;
