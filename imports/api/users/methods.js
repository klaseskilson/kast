import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import './users.js';

const loginError = new Meteor.Error('users.updateUser.notLoggedIn',
  'Must be logged in to update user.');

Meteor.users.methods.isSubscribed = podcastId => {
  const { profile } = Meteor.user();
  return profile.podcastSubscriptions.indexOf(podcastId) > -1;
};

const subscribe = podcastId => {
  Meteor.users.update(Meteor.userId(), {
    $addToSet: {
      'profile.podcastSubscriptions': podcastId,
    },
  });
};

const unSubscribe = podcastId => {
  Meteor.users.update(Meteor.userId(), {
    $pull: {
      'profile.podcastSubscriptions': podcastId,
    },
  });
};

Meteor.users.methods.updateUser = new ValidatedMethod({
  name: 'users.updateUser',

  validate({ key, value }) {
    check(key, String);
    check(value, String);
  },

  run({ key, value }) {
    if (!this.userId) {
      // Throw errors with a specific error code
      throw loginError;
    }

    const update = {};
    update[key] = value;

    Meteor.users.update(this.userId, {
      $set: update,
    });
  },
});

Meteor.users.methods.setUsername = new ValidatedMethod({
  name: 'user.setUsername',

  validate(newUsername) {
    check(newUsername, String);
  },

  run(newUsername) {
    if (!this.userId) {
      throw loginError;
    }

    if (!Meteor.isServer) return;

    Accounts.setUsername(this.userId, newUsername);
  },
});

Meteor.users.methods.togglePodcastSubscription = new ValidatedMethod({
  name: 'Meteor.users.methods.togglePodcastSubscription',

  validate(podcastId) {
    check(podcastId, String);
    check(Meteor.user(), Object);
  },

  run(podcastId) {
    if (Meteor.users.methods.isSubscribed(podcastId)) {
      unSubscribe(podcastId);
    } else {
      subscribe(podcastId);
    }
  },
});

Meteor.users.methods.subscribeToPodcast = new ValidatedMethod({
  name: 'Meteor.users.methods.subscribeToPodcast',

  validate(podcastId) {
    check(podcastId, String);
    check(Meteor.userId(), String);
  },

  run: subscribe,
});

Meteor.users.methods.unSubscribeFromPodcast = new ValidatedMethod({
  name: 'Meteor.users.methods.unSubscribeFromPodcast',

  validate(podcastId) {
    check(podcastId, String);
    check(Meteor.userId(), String);
  },

  run: unSubscribe,
});

export default Meteor.users.methods;
