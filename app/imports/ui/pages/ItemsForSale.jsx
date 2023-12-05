import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import ListItem from '../components/ListingItem';
import LoadingSpinner from '../components/LoadingSpinner';
import SideBar from '../components/SideBar';
import ListingModal from '../components/ListingModal';
import ReportModal from '../components/ReportModal'; // Import the ReportModal component
import { Listings } from '../../api/listing/Listing';

const ItemsForSale = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleReportClick = (item) => {
    setSelectedItem(item);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  return ready ? (
    <Container className="py-3">
      <Row>
        <Col xs={3}>
          <SideBar onFilterChange={setSelectedFilter} />
        </Col>
        <Col md={8}>
          <Row xs={1} md={3} className="g-4">
            {listings.map((listing) => (
              <Col key={listing._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <ListItem
                      listing={listing}
                      onClick={() => handleShowModal(listing)}
                      onReportClick={() => handleReportClick(listing)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Render the modals */}
      {selectedListing && (
        <ListingModal
          showModal={showModal}
          handleClose={handleCloseModal}
          listing={selectedListing}
        />
      )}
      {selectedItem && (
        <ReportModal
          show={showReportModal}
          handleClose={handleCloseReportModal}
          item={selectedItem}
        />
      )}
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ItemsForSale;
