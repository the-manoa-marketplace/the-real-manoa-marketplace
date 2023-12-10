import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { Messages } from '../../api/messages/Messages';

const MessageThreadModal = ({ show, handleClose, listingId, sellerName, userId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messageThread, setMessageThread] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await Messages.find({
          $or: [
            { listingId, sender: userId, receiver: sellerName },
            { listingId, sender: sellerName, receiver: userId },
          ],
        }).fetch();
        setMessageThread(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return undefined;
  }, [listingId, userId, sellerName]);

  const handleSendMessage = async () => {
    await Messages.insert({
      sender: userId,
      receiver: sellerName,
      listingId,
      message: newMessage,
      createdAt: new Date(),
    });

    setMessageThread([...messageThread, { sender: userId, message: newMessage }]);
    setNewMessage('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message Thread with {sellerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {messageThread.map((message, index) => (
            <ListGroup.Item key={index}>{`${message.sender}: ${message.message}`}</ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Group controlId="newMessage">
          <Form.Label>Your Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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

MessageThreadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  listingId: PropTypes.string.isRequired,
  sellerName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageThreadModal;
