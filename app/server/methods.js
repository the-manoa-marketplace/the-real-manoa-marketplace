// server/methods.js
import { Meteor } from 'meteor/meteor';
import { Reports } from '/imports/api/reports/Reports';

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  'ReportsCollection.insert'(reportData) {
    // Add your logic to insert the report into the Reports collection
    Reports.collection.insert(reportData);
  },
});
