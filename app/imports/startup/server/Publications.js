import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Listings } from '../../api/listing/Listing';
import { Profiles } from '../../api/Profile/Profiles';
import { Reports } from '../../api/reports/Reports';
import { Messages } from '../../api/messages/Messages';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Listings.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Listings.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    const messages = Messages.collection.find();
    console.log(`Publishing ${messages.count()} messages for user ${this.userId}`);
    // Adjust the logic based on your requirements for publishing user-specific messages
    return Messages.collection.find();
  }
  return this.ready();
});

Meteor.publish('allListings', function () {
  return Listings.collection.find();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Listings.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Listings.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reports.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reports.collection.find();
  }
  return this.ready();
});

Meteor.publish(Messages.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    // Adjust the logic based on your requirements for publishing all messages
    return Messages.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
// eslint-disable-next-line consistent-return
Meteor.publish('userMessages', function () {
  const userId = this.userId;
  if (userId) {
    const messages = Messages.collection.find({ sender: userId });
    console.log(`Publishing ${messages.count()} messages for user ${userId}`);
    return messages; // Return the messages cursor directly
  }
  return this.ready();
});
