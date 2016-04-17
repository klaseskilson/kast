import { Meteor } from 'meteor/meteor';

import Episodes from '../Episodes.js';

Episodes.pubs = {};

Meteor.publish('Episodes.pubs.all', podcastId => {
  const search = Episodes.find({ podcastId });

  if (search.count() === 0) {
    Episodes.methods.import.call(podcastId);
  }

  return search;
});
