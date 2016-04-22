import { Meteor } from 'meteor/meteor';

import Episodes from '../Episodes.js';

Episodes.pubs = {};

Meteor.publish('Episodes.pubs.all', (podcastId, limit = 20) => {
  const search = Episodes.find({ podcastId }, {
    sort: {
      published: -1,
    },
    limit,
  });

  if (search.count() === 0) {
    Episodes.methods.import.call(podcastId);
  }

  return search;
});
