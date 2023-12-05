import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Image, Carousel } from 'react-bootstrap';

const ListingModal = ({ showModal, handleClose, listing }) => (
  <Modal show={showModal} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Listing Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {listing && listing.images && listing.images.length > 0 ? (
        <Carousel>
          {listing.images.map((url, index) => (
            <Carousel.Item key={index}>
              <Image src={url} style={{ width: '100%' }} thumbnail />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Image
          src="https://res.cloudinary.com/ddfut4ysa/image/upload/v1701156762/syn00xfrluhatga6s08e.jpg"
          thumbnail
        />
      )}
      <p>
        <strong>Name:</strong> {listing?.listingTitle || 'N/A'}
      </p>
      <p>
        <strong>Price:</strong> ${listing?.price || 'N/A'}
      </p>
      <p>
        <strong>Condition:</strong> {listing?.condition || 'N/A'}
      </p>
      <p>
        <strong>Owner:</strong> {listing?.owner || 'N/A'}
      </p>
      <p>
        <strong>Description:</strong> {listing?.description || 'N/A'}
      </p>
      {/* Add other details as needed */}
    </Modal.Body>
    {/* ... (existing code) */}
  </Modal>
);

ListingModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    condition: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.string,
    _id: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
};

// Provide default values for the prop
ListingModal.defaultProps = {
  listing: {
    listingTitle: '',
    price: 0,
    condition: '',
    owner: '',
    description: '',
    tags: '',
    _id: '',
    images: [],
  },
};

export default ListingModal;
