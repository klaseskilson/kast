import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import PlayHistory from './PlayHistory.js';

const stopAllPreviousEpisodes = userId => {
  PlayHistory.update({ userId }, {
    $set: {
      playing: false,
      current: false,
    },
  }, { multi: true });
};

PlayHistory.methods.setCurrent = new ValidatedMethod({
  name: 'PlayHistory.methods.setCurrent',

  validate(episodeId) {
    check(episodeId, String);
  },

  run(episodeId) {
    const userId = Meteor.userId();

    stopAllPreviousEpisodes(userId);

    PlayHistory.upsert({
      userId,
      episodeId,
    }, {
      $set: {
        userId,
        episodeId,
        current: true,
        playing: true,
      },
      $setOnInsert: {
        progress: 0,
      },
    });
  },
});

PlayHistory.methods.togglePauseCurrent = new ValidatedMethod({
  name: 'PlayHistory.methods.togglePauseCurrent',

  validate() {
    check(Meteor.user(), Object);
  },

  run() {
    const userId = Meteor.userId();
    const { playing } = PlayHistory.findOne({ userId, current: true }) || {};
    PlayHistory.update({
      userId,
      current: true,
    }, {
      $set: {
        playing: !playing,
      },
    });
  },
});

export default PlayHistory;
