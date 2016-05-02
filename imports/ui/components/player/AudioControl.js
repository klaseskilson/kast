import { _ } from 'meteor/underscore';

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
    const control = this;
    control.context.src = url;

    control.context.addEventListener('loadeddata', () => {
      if (control.isReady()) {
        control.onLoaded();
        control.play();
      }
    });
  }

  onError(error) {
    // eslint-disable-next-line no-console
    console.error(error);
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

  playFromTime(time = this.context.currentTime) {
    if (this.isPaused()) {
      this.seek(time);
      this.play();
    } else {
      this.pause();
    }
  }

  seek(time) {
    const newTime = Math.min(Math.max(time, 0), this.context.duration);
    this.context.currentTime = newTime;
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
    return this.context.currentTime;
  }

  destroy() {
    this.pause();
    this.context.src = '';
    this.context.load();
    delete this.context;
  }
}

export default AudioControl;
