import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import ListItem from '../components/ListingItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Listings } from '../../api/listing/Listing';
import ListingModal from '../components/ListingModal';
import SideBar from '../components/SideBar'; // Import the SideBar component

const MyListings = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const { ready, listings } = useTracker(() => {
    const subscription = Meteor.subscribe(Listings.userPublicationName);
    const rdy = subscription.ready();

    const filterCondition = selectedFilter ? { tags: selectedFilter } : {};

    const listingItems = Listings.collection.find(filterCondition).fetch();
    return {
      listings: listingItems,
      ready: rdy,
    };
  }, [selectedFilter]);

  const handleShowModal = (listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedListing(null);
  };

  return ready ? (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={3}>
          <SideBar onFilterChange={setSelectedFilter} />
        </Col>
        <Col xs={9} className="py-3">
          <Row className="justify-content-center">
            <Col md={8}>
              <Col className="text-center ml-5">
                <h2>Your Listings</h2>
              </Col>
              <Row>
                {listings.map((listing) => (
                  <Col key={listing._id} md={4} className="mb-4">
                    <ListItem
                      listing={listing}
                      showEditLink
                      onClick={() => handleShowModal(listing)}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Render the modal component */}
      <ListingModal showModal={showModal} handleClose={handleCloseModal} listing={selectedListing} />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default MyListings;
