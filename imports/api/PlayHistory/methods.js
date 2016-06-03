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

const markAsPlayed = episodeId => {
  const userId = Meteor.userId();

  PlayHistory.upsert({
    userId,
    episodeId,
  }, {
    $set: {
      playedAt: new Date(),
    },
    $setOnInsert: {
      progress: 0,
      current: false,
      playing: false,
      userId,
      episodeId,
    },
  });
};

const unMarkAsPlayed = episodeId => {
  const userId = Meteor.userId();

  PlayHistory.update({
    userId,
    episodeId,
  }, {
    $unset: {
      playedAt: 1,
    },
  });
};

PlayHistory.methods.setCurrent = new ValidatedMethod({
  name: 'PlayHistory.methods.setCurrent',

  validate(episodeId) {
    check(episodeId, String);
    check(Meteor.userId(), String);
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

PlayHistory.methods.updateCurrent = new ValidatedMethod({
  name: 'PlayHistory.methods.updateCurrent',

  validate() {
    check(Meteor.userId(), String);
  },

  run(updated) {
    const userId = Meteor.userId();
    if (updated.userId !== userId) return;

    PlayHistory.update({
      current: true,
      userId,
    }, {
      $set: updated,
    });
  },
});

PlayHistory.methods.markCurrentAsPlayed = new ValidatedMethod({
  name: 'PlayHistory.methods.markCurrentAsPlayed',

  validate() {
    check(Meteor.user(), Object);
  },

  run() {
    const userId = Meteor.userId();
    PlayHistory.update({
      current: true,
      userId,
    }, {
      $set: {
        playedAt: new Date(),
        playing: false,
        progress: 0,
      },
    });
  },
});

PlayHistory.methods.markAsPlayed = new ValidatedMethod({
  name: 'PlayHistory.methods.markAsPlayed',

  validate(episodeId) {
    check(episodeId, String);
    check(Meteor.userId(), String);
  },

  run: markAsPlayed,
});

PlayHistory.methods.unMarkAsPlayed = new ValidatedMethod({
  name: 'PlayHistory.methods.unMarkAsPlayed',

  validate(episodeId) {
    check(episodeId, String);
    check(Meteor.userId(), String);
  },

  run: unMarkAsPlayed,
});

PlayHistory.methods.togglePlayedStatus = new ValidatedMethod({
  name: 'PlayHistory.methods.togglePlayedStatus',

  validate(episodeId) {
    check(episodeId, String);
    check(Meteor.userId(), String);
  },

  run(episodeId) {
    const userId = Meteor.userId();
    const existing = PlayHistory.findOne({
      userId,
      episodeId,
      playedAt: {
        $exists: true,
      },
    });
    if (existing) {
      return unMarkAsPlayed(episodeId);
    }
    return markAsPlayed(episodeId);
  },
});

export default PlayHistory;
