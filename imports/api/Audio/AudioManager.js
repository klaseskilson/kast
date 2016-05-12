/**
 * handle the audio playback data layer
 */

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { _ } from 'meteor/stevezhu:lodash';
import PlayHistory from '../PlayHistory/methods.js';

const SESSION_KEY = 'nowPlaying';

class AudioManager {
  /* Static methods */

  /**
   * set playing episode, pauses if it is the episode that is currently playing
   * @param {String} episodeId the episode id
   */
  static setEpisode(episodeId) {
    if (AudioManager.isCurrentEpisode(episodeId)) {
      AudioManager.togglePause();
      return;
    }

    if (Meteor.userId()) {
      PlayHistory.methods.setCurrent.call(episodeId);
    } else {
      AudioManager.setSession(episodeId);
    }
  }

  static togglePause() {
    if (Meteor.userId()) {
      PlayHistory.methods.togglePauseCurrent.call();
    } else {
      AudioManager.togglePauseSession();
    }
  }

  static setSession(episodeId) {
    Session.set(SESSION_KEY, {
      episodeId,
      current: true,
      playing: true,
      progress: 0,
    });
  }

  static togglePauseSession() {
    const nowPlaying = AudioManager.getSession();
    nowPlaying.playing = !nowPlaying.playing;
    Session.set(SESSION_KEY, nowPlaying);
  }

  static isCurrentEpisode(episodeId) {
    const playing = AudioManager.getPlaying();
    return playing && playing.episodeId === episodeId;
  }

  /**
   * get currently playing
   */
  static getPlaying() {
    if (Meteor.userId()) {
      return AudioManager.getCollection();
    }
    return AudioManager.getSession();
  }

  /**
   * get currently playing info from session
   */
  static getSession() {
    return Session.get(SESSION_KEY);
  }

  /**
   * get currently playing info from collection
   */
  static getCollection() {
    return PlayHistory.findOne({
      current: true,
      userId: Meteor.userId(),
    });
  }

  /**
   * see if it is something currently playing
   * @returns {boolean}
   */
  static isPlaying() {
    return !!AudioManager.getPlaying().playing;
  }

  /**
   * store progress
   * @param {Number} progress
   */
  static setProgress(progress) {
    console.info('Storing progress!');
    AudioManager.updateParams({ progress });
  }

  static updateParams(update) {
    const updatedPlaying = _.extend(AudioManager.getPlaying(), update);

    if (updatedPlaying._id) delete updatedPlaying._id;

    if (!PlayHistory.schema.newContext().validate(updatedPlaying)) {
      // eslint-disable-next-line no-console
      console.error('Invalid PlayHistory object:', updatedPlaying);
    }

    if (Meteor.user()) {
      PlayHistory.methods.updateCurrent.call(updatedPlaying);
    } else {
      Session.set(SESSION_KEY, updatedPlaying);
    }
  }
}


export default AudioManager;
