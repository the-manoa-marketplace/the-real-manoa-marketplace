import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Image, Carousel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import ReportModal from './ReportModal';
import ContactSellerModal from './ContactSellerModal';
import MessageThreadModal from './MessageThreadModal'; // Import the new component

const ListingModal = ({ showModal, handleClose, listing }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showContactSellerModal, setShowContactSellerModal] = useState(false);
  const [showMessageThreadModal, setShowMessageThreadModal] = useState(false);
  const [messageThread, setMessageThread] = useState([]);
  const userId = Meteor.userId(); // Get the userId directly from Meteor
  const user = Meteor.users.findOne(userId); // Get the user document
  let userEmail;
  if (user && user.emails && user.emails[0]) {
    userEmail = user.emails[0].address;
  }
  console.log('userEmfwfail:', userEmail);
  const handleShowReportModal = () => setShowReportModal(true);
  const handleCloseReportModal = () => setShowReportModal(false);

  const handleReportClick = () => {
    handleShowReportModal();
  };

  const handleShowContactSellerModal = () => setShowContactSellerModal(true);
  const handleCloseContactSellerModal = () => setShowContactSellerModal(false);

  const handleShowMessageThreadModal = () => {
    // Assume messages are retrieved from a database or another source
    const initialMessages = ['Hello, is the item still available?', 'Yes, it is.'];
    setMessageThread(initialMessages);
    setShowMessageThreadModal(true);
  };

  const handleCloseMessageThreadModal = () => setShowMessageThreadModal(false);

  const handleSendMessageToSeller = (newMessage) => {
    // Add logic to save the new message to the message thread
    setMessageThread([...messageThread, newMessage]);
    // Close the Contact Seller modal (if open)
    handleCloseContactSellerModal();
  };

  return (
    <>
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
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleReportClick}>
            Report
          </Button>
          <Button variant="primary" onClick={handleShowContactSellerModal}>
            Contact Seller
          </Button>
          <Button variant="info" onClick={handleShowMessageThreadModal}>
            View Messages
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the ReportModal */}
      <ReportModal show={showReportModal} handleClose={handleCloseReportModal} item={listing} />

      {/* Render the ContactSellerModal */}
      <ContactSellerModal
        show={showContactSellerModal}
        handleClose={handleCloseContactSellerModal}
        sellerName={listing?.owner || 'Seller'}
        userEmail={userEmail} // Pass userEmail as a prop
        userId={userId} // Pass userId as a prop
        onSendMessage={handleSendMessageToSeller}
      />

      <MessageThreadModal
        show={showMessageThreadModal}
        handleClose={handleCloseMessageThreadModal}
        messages={messageThread}
        sellerName={listing?.owner || 'Seller'}
        userEmail={userEmail} // Pass userEmail as a prop
        userId={userId} // Pass userId as a prop
        onSendMessage={handleSendMessageToSeller}
      />
    </>
  );
};

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

// Provide default values for the props
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
