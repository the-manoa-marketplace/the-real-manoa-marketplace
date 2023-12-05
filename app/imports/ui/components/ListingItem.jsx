import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ListingModal from './ListingModal'; // Import the new component

const ListItem = ({ listing }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Ensure the div is focusable and handle keyboard events
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Trigger the modal on Enter or Space key press
      handleShow();
    }
  };

  return (
    <>
      <Card
        style={{ border: '1px solid #ccc', marginBottom: '15px' }}
        tabIndex="0" // Make the div focusable
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

      {/* Render the modal component */}
      <ListingModal
        showModal={showModal}
        handleClose={handleClose}
        listing={listing}
      />
    </>
  );
};

ListItem.propTypes = {
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.string,
    _id: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ListItem;
