import { Meteor } from 'meteor/meteor';

import PlayHistory from '../PlayHistory.js';

PlayHistory.pubs = {};

Meteor.publish('PlayHistory.pubs.current', userId =>
  PlayHistory.find({ userId, current: true }));

Meteor.publish('PlayHistory.pubs.allPlayedEpisodes', function allPlayedEpisodes() {
  const userId = this.userId;
  return PlayHistory.find({
    userId,
    playedAt: {
      $exists: true,
    },
  });
});

Meteor.publish('PlayHistory.pubs.playedEpisode', function playedEpisode(episodeId) {
  const userId = this.userId;
  return PlayHistory.find({
    userId,
    episodeId,
    playedAt: {
      $exists: true,
    },
  });
});
