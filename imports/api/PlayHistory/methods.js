import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import PlayHistory from './PlayHistory.js';

PlayHistory.methods.setCurrent = new ValidatedMethod({
  name: 'PlayHistory.methods.setCurrent',

  validate(episodeId) {
    check(episodeId, String);
  },

  run(episodeId) {
    const user = Meteor.user();
    if (!user) return;

    const userId = user._id;

    PlayHistory.update({ userId }, {
      $set: {
        playing: false,
        current: false,
      },
    }, { multi: true });

    PlayHistory.upsert({
      userId,
      episodeId,
    }, {
      $set: {
        userId,
        episodeId,
        current: true,
      },
      $setOnInsert: {
        progress: 0,
        playing: true,
      },
    });
  },
});

export default PlayHistory;
