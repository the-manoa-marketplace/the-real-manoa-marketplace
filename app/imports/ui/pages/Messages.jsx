import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/messages/Messages';

const MessagesPage = () => {
  const [messageThreads, setMessageThreads] = useState([]);
  const user = Meteor.user(); // Get the user document directly from Meteor
  const userId = user ? user._id : null; // Get the userId from the user document
  console.log('userId', userId);
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe('userMessages', userId);
    const rdy = subscription.ready();
    const userMessages = Messages.collection.find({
      $or: [{ sender: userId }],
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

    return {
      ready: rdy,
      messages: userMessages,
    };
  }, [userId]);

  return (
    <div>
      <h1>My Messages</h1>
      {ready ? (
        Object.entries(messageThreads).map(([identifier, messages]) => {
          const [ otherUserId] = identifier.split('-');
          const otherUser = Meteor.users.findOne({ username: otherUserId });

          return (
            <div key={identifier}>
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

export default MessagesPage;
