/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';

import './users.js';

// client tests
describe('users', function () {
  beforeEach(function (done) {
    Factory.create('user');
    done();
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
});
