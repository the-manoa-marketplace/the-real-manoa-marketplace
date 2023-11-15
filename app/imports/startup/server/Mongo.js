import { Meteor } from 'meteor/meteor';
import { Listings } from '../../api/listing/Listing.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addListing = (listing) => {
  console.log(`  Adding: ${listing.name} (${listing.owner})`);
  Listings.collection.insert(listing);
};

// Initialize the StuffsCollection if empty.
if (Listings.collection.find().count() === 0) {
  if (Meteor.settings.defaultListings) {
    console.log('Creating default listings.');
    Meteor.settings.defaultListings.forEach(listing => addListing(listing));
  }
}
