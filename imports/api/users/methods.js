import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import './users.js';

export const updateUser = new ValidatedMethod({
  name: 'users.updateUser',

  validate({ key, value }) {
    check(key, String);
    check(value, String);
  },

  run({ key, value }) {
    if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error('users.updateUser.notLoggedIn',
        'Must be logged in to update user.');
    }

    const update = {};
    update[key] = value;

    Meteor.users.update(this.userId, {
      $set: update,
    });
  },
});
