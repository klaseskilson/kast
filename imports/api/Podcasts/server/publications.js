import { Meteor } from 'meteor/meteor';

import Podcasts from '../Podcasts.js';

Podcasts.pubs = {};

const twoDays = 2 * 24 * 60 * 60 * 1000;

Podcasts.pubs.collection = Meteor.publish('Podcasts.pubs.collection', collectionId => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setTime(Date.now() - twoDays);

  let search = Podcasts.find({
    collectionId,
    updatedAt: {
      $gt: twoDaysAgo,
    },
  });

  // check to see if we have any saved podcasts for this collectionId
  if (search.count() === 0) {
    Podcasts.methods.fetchPodcast.call(collectionId);
    search = Podcasts.find({ collectionId });
  }

  return search;
});

