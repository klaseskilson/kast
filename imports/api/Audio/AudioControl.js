import { _ } from 'meteor/underscore';
import AudioManager from './AudioManager.js';

class AudioControl {
  constructor() {
    this.context = new Audio();
    this.cb = {
      onPause: _.identity,
      onPlay: _.identity,
      onLoaded: _.identity,
    };
  }

  load(url) {
    this.context.src = url;

    this.context.addEventListener('loadeddata', () => {
      if (this.isReady()) {
        this.onLoaded();
      } else {
        if (this.context.error) {
          this.onError(this);
        }
      }
    });

    this.context.addEventListener('error', this.onError.bind(this));
    this.context.addEventListener('ended', this.onEnded.bind(this));
  }

  onError({ currentTarget }) {
    const { error } = currentTarget || this.context;
    // eslint-disable-next-line no-console
    console.error('Error from audio element event listener!', error);
  }

  onPause() {
    return this.cb.onPause();
  }

  onPlay() {
    return this.cb.onPlay();
  }

  onLoaded() {
    return this.cb.onLoaded();
  }

  onEnded() {
    AudioManager.markCurrentAsPlayed();
  }

  seek(time) {
    const { duration } = this.context;
    const newTime = Math.min(Math.max(time, 0), duration || Infinity);
    if (Number.isFinite(newTime)) {
      this.context.currentTime = newTime;
    }
  }

  pause() {
    const time = this.context.currentTime;
    this.context.pause();
    this.onPause(time);
  }

  play() {
    this.context.play().then(this.onPlay.bind(this));
  }

  toggle() {
    if (this.isPaused()) {
      this.play();
    } else {
      this.pause();
    }
  }

  isPaused() {
    return this.context.paused;
  }

  isRunning() {
    return !this.context.paused;
  }

  isReady() {
    return this.context.readyState >= 2;
  }

  getTime() {
    return Math.round(this.context.currentTime);
  }

  destroy() {
    this.pause();
    this.context.removeEventListener('error', this.onError);
    this.context.removeEventListener('ended', this.onEnded);
    delete this.context;
  }
}

export default AudioControl;
