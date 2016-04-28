import { Meteor } from 'meteor/meteor';

import PlayHistory from '../PlayHistory.js';

PlayHistory.pubs = {};

PlayHistory.pubs.current = Meteor.publish('PlayHistory.pubs.current', userId => {
  const cursor = PlayHistory.find({ userId, current: true });
  console.log('sub', userId, cursor.count());
  return cursor;
});
