import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/messages/Messages';
import { Listings } from '../../api/listing/Listing';

const MessagesPage = ({ userId }) => {
  const [messageThreads, setMessageThreads] = useState([]);

  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe('userMessages', userId);

    if (subscription.ready()) {
      const userMessages = Messages.find({
        $or: [{ sender: userId }, { receiver: userId }],
      }).fetch();

      const groupedMessages = {};
      userMessages.forEach((message) => {
        const otherUserId = message.sender === userId ? message.receiver : message.sender;
        const identifier = `${message.listingId}-${otherUserId}`;
        if (!groupedMessages[identifier]) {
          groupedMessages[identifier] = [];
        }
        groupedMessages[identifier].push(message);
      });

      setMessageThreads(groupedMessages);
    }

    return {
      ready: subscription.ready(),
    };
  }, [userId]);

  return (
    <div>
      <h1>My Messages</h1>
      {ready ? (
        Object.entries(messageThreads).map(([identifier, messages]) => {
          const [listingId, otherUserId] = identifier.split('-');
          const otherUser = Meteor.users.findOne({ _id: otherUserId });
          const listing = Listings.findOne({ _id: listingId });

          return (
            <div key={identifier}>
              <h3>Listing Title: {listing.title}</h3>
              <h4>Message Thread with: {otherUser ? otherUser.username : 'User not found'}</h4>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{`${message.sender}: ${message.message}`}</li>
                ))}
              </ul>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

MessagesPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default MessagesPage;
