import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import './users.js';

const loginError = new Meteor.Error('users.updateUser.notLoggedIn',
  'Must be logged in to update user.');

export const updateUser = new ValidatedMethod({
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

export const setUsername = new ValidatedMethod({
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
