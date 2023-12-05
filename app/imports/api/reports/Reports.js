import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ReportsCollection {
  constructor() {
    this.name = 'ReportsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      report: String,
      itemName: String,
      itemId: String,
      owner: String,
      createdAt: Date,
      closed: Boolean,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Reports = new ReportsCollection();
