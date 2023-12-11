import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Listings } from '../../api/listing/Listing';

class MessagesCollection {
  constructor() {
    this.name = 'MessagesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      sender: String,
      receiver: String,
      message: String,
      timestamp: Date,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Messages = new MessagesCollection();
