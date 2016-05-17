import { Meteor } from 'meteor/meteor';

import PlayHistory from '../PlayHistory.js';

PlayHistory.pubs = {};

PlayHistory.pubs.current = Meteor.publish('PlayHistory.pubs.current', userId =>
  PlayHistory.find({ userId, current: true }));
