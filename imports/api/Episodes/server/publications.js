import { Meteor } from 'meteor/meteor';

import Episodes from '../Episodes.js';

Episodes.pubs = {};

Meteor.publish('Episodes.pubs.limit', (podcastId, limit = 20) => {
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

Meteor.publish('Episodes.pubs.single', episodeId => Episodes.find(episodeId));

Meteor.publish('Episodes.pubs.user', function userEpisodes(limit = 20) {
  const { profile } = Meteor.users.findOne(this.userId);
  return Episodes.find({
    podcastId: {
      $in: profile.podcastSubscriptions,
    },
  }, {
    sort: { published: -1 },
    limit,
  });
});
