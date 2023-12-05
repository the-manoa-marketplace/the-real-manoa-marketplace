import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Define the ReportsCollection with a schema
export const Reports = new Mongo.Collection('reports');

// Schema for Reports
Reports.schema = new SimpleSchema({
  report: {
    type: String,
    label: 'Report description',
  },
  itemName: {
    type: String,
    label: 'Name of the item',
  },
  itemId: {
    type: String,
    label: 'ID of the item',
  },
  owner: {
    type: String,
    label: 'Owner of the item',
  },
  createdAt: {
    type: Date,
    label: 'Creation date of the report',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset(); // Prevent user from supplying their own value

    },
  },
  closed: {
    type: Boolean,
    label: 'Is the report resolved',
    defaultValue: false,
  },
});

// Attach the schema to the collection
Reports.attachSchema(Reports.schema);

// Define a Meteor method for inserting reports
if (Meteor.isServer) {
  Meteor.methods({
    'reports.insert'(report) {
      // Validate the argument
      check(report, {
        report: String,
        itemName: String,
        itemId: String,
        owner: String,
        closed: Boolean,
      });

      // Make sure the user is logged in before inserting a report
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Reports.insert({
        ...report,
        createdAt: new Date(), // Current time
        // You can add more fields here if necessary
      });
    },
  });
}
