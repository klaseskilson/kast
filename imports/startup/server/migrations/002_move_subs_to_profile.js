import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';

Migrations.add({
  version: 2,

  name: 'Move podcastSubscriptions to profile',

  down: () => {
    Meteor.users.find({}).forEach(user => {
      Meteor.users.update(user._id, {
        $set: {
          podcastSubscriptions: user.profile.podcastSubscriptions || [],
        },
        $unset: {
          'profile.podcastSubscriptions': 1,
        },
      });
    });
  },

  up: () => {
    Meteor.users.find({}).forEach(({ _id, podcastSubscriptions }) => {
      Meteor.users.update(_id, {
        $set: {
          'profile.podcastSubscriptions': podcastSubscriptions,
        },
        $unset: {
          podcastSubscriptions: '',
        },
      }, {
        validate: false,
      });
    });
  },
});
