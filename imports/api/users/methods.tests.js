/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';

import './users.js';
import { updateUser } from './methods.js';

Meteor.methods({
  setPassword(userId, password) {
    if (Meteor.isServer) {
      Accounts.setPassword(userId, password);
    }
  },
});

Factory.define('user', Meteor.users, {
  username: () => faker.internet.userName(),
  password: () => 'password',
  profile: () => ({ name: faker.name.findName() }),
  createdAt: () => new Date(),
});

// client tests
describe('users', function () {
  beforeEach(function (done) {
    const user = Factory.create('user');
    Meteor.call('setPassword', user._id, 'password', () => {
      if (Meteor.isClient) {
        Meteor.loginWithPassword(user.username, 'password', done);
      } else {
        done();
      }
    });
  });

  it('should not update user directly on client but on server', function (done) {
    const user = Meteor.users.findOne();

    // try to update collection directly, not allowed on client but on server
    Meteor.users.update(user._id, {
      $set: {
        'profile.name': 'something stupid',
      },
    }, (error, affectedDocuments) => {
      // different assertions for client/server
      if (Meteor.isClient) {
        chai.assert.typeOf(error, 'object');
        chai.assert.strictEqual(affectedDocuments, false);
      } else {
        chai.assert.equal(error, null);
        chai.assert.strictEqual(affectedDocuments, 1);
      }
      done();
    });
  });

  if (Meteor.isClient) {
    it('should change user profile name through update method', function (done) {
      const newName = faker.name.findName();

      // update user
      updateUser.call({
        key: 'profile.name',
        value: newName,
      }, (error) => {
        const updatedUser = Meteor.user();
        chai.assert.equal(error, null);
        chai.assert.equal(updatedUser.profile.name, newName);
        done();
      });
    });
  }
});
