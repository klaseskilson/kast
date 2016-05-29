import { Meteor } from 'meteor/meteor';
import Schema from './schema';

Meteor.users.methods = {};
Meteor.users.attachSchema(Schema);

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; },
});

Meteor.users.allow({
  insert() { return Meteor.isTest; },
});
