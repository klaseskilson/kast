import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';

Migrations.add({
  version: 1,

  name: 'Add subscriptions to users',

  up: () => {
    Meteor.users.update({}, {
      $set: {
        podcastSubscriptions: [],
      },
    });
  },
});
