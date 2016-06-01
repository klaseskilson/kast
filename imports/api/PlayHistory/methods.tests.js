/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';

import PlayHistory from './methods.js';
import '../users/users';

PlayHistory.allow({
  insert() { return Meteor.isTest; },
  update() { return Meteor.isTest; },
});

Factory.define('playHistory', PlayHistory, {
  episodeId: Random.id(),
  userId: Random.id(),
});

// Factory.define('user', Meteor.users, {
//   username: () => faker.internet.userName(),
//   profile: () => ({ name: faker.name.findName() }),
//   createdAt: () => new Date(),
//   password: () => 'testPassword',
// });

describe('PlayHistory', function () {
  beforeEach(function (done) {
    Factory.create('playHistory');
    const username = faker.internet.userName();
    const password = faker.internet.password();

    const user = {
      profile: { name: faker.name.findName() },
      createdAt: new Date(),
      username,
      password,
    };

    // `Accounts.createUser` with callback is not supported on the server
    if (Meteor.isClient) {
      Accounts.createUser(user, () => {
        Meteor.loginWithPassword(username, password, done);
      });
    } else {
      done();
    }
  });

  // Since `setCurrent` requires a logged in user, we can only expect it to work on the
  // client. It should, however fail on the server.
  it('should set current episode', function (done) {
    PlayHistory.methods.setCurrent.call(Random.id(), error => {
      if (Meteor.isClient) {
        chai.assert.isUndefined(error, 'no error defined');
      } else {
        chai.assert.isDefined(error, 'method call failed on server, produced error');
        chai.assert.isObject(error);
      }
      done();
    });
  });

  // it('should toggle current playing episode', function (done) {
  //   const id = Random.id();
  //   const userId = Meteor.userId();
  //   console.log('test out', userId);
  //   PlayHistory.methods.setCurrent.call(id, currentError => {
  //     const playHistory = PlayHistory.findOne({ userId });
  //     if (!currentError) {
  //       PlayHistory.methods.togglePauseCurrent.call(toggleError => {
  //         if (!toggleError) {
  //           const updated = PlayHistory.findOne(playHistory._id);
  //           chai.assert.strictEqual(updated.playing, !playHistory.playing);
  //           done();
  //         } else {
  //           throw toggleError;
  //         }
  //       });
  //     } else {
  //       throw currentError;
  //     }
  //   });
  // });
  //
  // it('should mark episode as played', function (done) {
  //   done();
  // });
});
