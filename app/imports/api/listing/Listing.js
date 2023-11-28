import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ListingsCollection. It encapsulates state and variable values for listing.
 */
class ListingsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ListingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      listingTitle: String,
      price: Number,
      owner: String,
      description: String,
      condition: {
        type: String,
        allowedValues: ['Factory New', 'Like New', 'Fair', 'Field-Tested'],
      },
      tags: {
        type: String,
        allowedValues: ['Apparel', 'Housewares', 'Vehicle', 'Electronics', 'Games', 'Other'],
      },
      images: {
        type: Array,
        optional: true,
      },
      'images.$': {
        type: String,
        optional: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {ListingsCollection}
 */
export const Listings = new ListingsCollection();
