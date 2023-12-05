import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Image, Carousel, Button } from 'react-bootstrap';

const ListingModal = ({ showModal, handleClose, listing, onReportClick }) => (
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
      {/* Add other details as needed */}
      <Button variant="danger" onClick={onReportClick}>
        Report
      </Button>
    </Modal.Body>
  </Modal>
);

ListingModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  listing: PropTypes.shape({
    listingTitle: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  onReportClick: PropTypes.func.isRequired,
};

ListingModal.defaultProps = {
  listing: {
    listingTitle: '',
    price: 0,
    images: [],
  },
};

export default ListingModal;
