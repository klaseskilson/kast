import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Factory } from 'meteor/dburles:factory';

if (Meteor.isTest) {
  Meteor.methods({
    setPassword(userId, password) {
      if (Meteor.isServer) {
        Accounts.setPassword(userId, password);
      }
    },
  });

  Factory.define('user', Meteor.users, {
    username: () => faker.internet.userName(),
    profile: () => ({ name: faker.name.findName() }),
    createdAt: () => new Date(),
    password: () => 'testPassword',
  }).after(doc => {
    Meteor.call('setPassword', doc._id, 'testPassword');
  });
}
