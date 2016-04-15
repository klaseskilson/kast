import { Meteor } from 'meteor/meteor';

import Episodes from '../Episodes.js';

Episodes.pubs = {};

Episodes.pubs.all = Meteor.publish('Episodes.pubs.all', podcastId => {
  const search = Episodes.find({ podcastId });

  if (search.count() === 0) {

  }

  return search;
});
