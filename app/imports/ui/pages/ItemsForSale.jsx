import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import ListItem from '../components/ListingItem';
import LoadingSpinner from '../components/LoadingSpinner';
import SideBar from '../components/SideBar';
import { Listings } from '../../api/listing/Listing';
import ListingModal from '../components/ListingModal';

const ItemsForSale = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const { ready, listings } = useTracker(() => {
    const subscription = Meteor.subscribe('allListings');
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
    <Container className="py-3">
      <Row>
        <Col xs={3}>
          <SideBar onFilterChange={setSelectedFilter} />
        </Col>
        <Col md={8}>
          <Col className="text-center ml-2">
            <h2>Items For Sale</h2>
          </Col>
          <Row xs={1} md={3} className="g-4">
            {listings.map((listing) => (
              <Col key={listing._id} className="mb-4">
                <ListItem listing={listing} onClick={() => handleShowModal(listing)} key={listing._id} />
              </Col>
            ))}
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

export default ItemsForSale;
