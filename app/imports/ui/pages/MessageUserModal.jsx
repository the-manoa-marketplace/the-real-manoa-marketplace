import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const MessageUserModal = ({ show, handleClose, recipient }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Add logic to send the message, e.g., through an API or Meteor method
    console.log(`Sending message to ${recipient}: ${message}`);
    // Close the modal after sending the message
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Send Message to {recipient}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="messageForm">
            <Form.Label>Message:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Form>
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

MessageUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipient: PropTypes.string.isRequired,
};

export default MessageUserModal;
