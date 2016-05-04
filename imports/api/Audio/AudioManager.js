/**
 * handle the audio playback data layer
 */

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PlayHistory from '../PlayHistory/methods.js';

const SESSION_KEY = 'nowPlaying';

class AudioManager {
  comstructor() {
    console.log('duh');
  }

  pause() {
    AudioManager.pause();
  }

  /* Static methods */

  /**
   * set playing episode
   * @param {String} episodeId the episode id
   */
  static setEpisode(episodeId) {
    if (AudioManager.isPlaying(episodeId)) {
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

  static isPlaying(episodeId) {
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
}

export default AudioManager;
