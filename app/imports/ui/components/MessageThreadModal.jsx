import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import { Messages } from '../../api/messages/Messages';

const MessageThreadModal = ({ show, handleClose, listingId, sellerName, userEmail }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messageThread, setMessageThread] = useState([]);
  console.log('userEmail:', userEmail);
  console.log('sellerName:', sellerName);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await Messages.find({
          $or: [
            { listingId, sender: userEmail, receiver: sellerName },
            { listingId, sender: sellerName, receiver: userEmail },
          ],
        }).fetch();
        setMessageThread(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return undefined;
  }, [listingId, userEmail, sellerName]);

  const handleSendMessage = async () => {
    // eslint-disable-next-line no-shadow

    const user = Meteor.users.findOne({ 'emails.address': sellerName });
    let userId;
    if (user) {
      userId = user._id;
    } else {
      console.log('No user found with email:', sellerName);
    }
    console.log('userId:', userId);
    await Messages.collection.insert({
      sender: Meteor.userId(),
      receiver: userId,
      message: newMessage,
      timestamp: new Date(),
    });

    setMessageThread([...messageThread, { sender: userEmail, message: newMessage }]);
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
  userEmail: PropTypes.string.isRequired,
};

export default MessageThreadModal;
