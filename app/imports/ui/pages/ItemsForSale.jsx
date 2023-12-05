import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import ListingItem from '../components/ListingItem'; // Assuming ListingItem is the combined component
import LoadingSpinner from '../components/LoadingSpinner';
import SideBar from '../components/SideBar';
import { Listings } from '../../api/listing/Listing';
import ListingModal from '../components/ListingModal'; // For viewing listing details
import ReportModal from '../components/ReportModal'; // For reporting an item

const ItemsForSale = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
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

  const handleShowDetailModal = (listing) => {
    setSelectedListing(listing);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
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
          <Row>
            {listings.map((listing) => (
              <Col key={listing._id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <ListingItem
                      listing={listing}
                      onDetailClick={() => handleShowDetailModal(listing)}
                      onReportClick={() => handleReportClick(listing)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {selectedListing && (
        <ListingModal
          showModal={showDetailModal}
          handleClose={handleCloseDetailModal}
          listing={selectedListing}
         onReportClick={}/>
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
