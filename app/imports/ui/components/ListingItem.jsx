import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ListingModal from './ListingModal';

const ListItem = ({ listing, onReportClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleShow();
    }
  };

  return (
    <>
      <Card
        style={{ border: '1px solid #ccc', marginBottom: '15px' }}
        tabIndex="0"
        role="button"
        onClick={handleShow}
        onKeyDown={handleKeyDown}
      >
        <Card.Body>
          <img
            src={
              listing.images && listing.images.length > 0
                ? listing.images[0]
                : 'https://res.cloudinary.com/ddfut4ysa/image/upload/v1701156762/syn00xfrluhatga6s08e.jpg'
            }
            alt={listing.listingTitle}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <Card.Title>{listing.listingTitle}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ${listing.price}
          </Card.Text>
        </Card.Body>
      </Card>

      <ListingModal
        showModal={showModal}
        handleClose={handleClose}
        listing={listing}
        onReportClick={onReportClick}
      />
    </>
  );
};

ListItem.propTypes = {
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onReportClick: PropTypes.func.isRequired,
};

export default ListItem;
