import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const ContactSellerModal = ({ show, handleClose, sellerName }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Implement your logic to send the message
    console.log(`Message to ${sellerName}: ${message}`);
    // Add your logic to send the message to the seller
    // You might want to use a Meteor method or another communication mechanism
    // Reset the message input
    setMessage('');
    // Close the modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Seller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="message">
          <Form.Label>Your Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendMessage}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Add PropTypes validation
ContactSellerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  sellerName: PropTypes.string.isRequired,
};

export default ContactSellerModal;
