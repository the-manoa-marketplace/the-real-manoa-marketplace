// server/methods.js
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Reports } from 'reports/Reports';

Meteor.methods({
  'ReportsCollection.insert'(reportData) {
    check(reportData, {
      report: String,
      itemName: String,
      itemId: String,
      owner: String,
      createdAt: Date,
      closed: Boolean,
    });

    return Reports.collection.insert(reportData);
  },
});
