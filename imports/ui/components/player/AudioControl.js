import { _ } from 'meteor/underscore';

const createCORSRequest = (method, url) => {
  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.withCredentials = true;
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
};

class AudioControl {
  constructor() {
    this.context = new window.AudioContext();
    this.audioBuffer = null;
    this.source = null;
    this.cb = {
      onPause: _.identity,
      onPlay: _.identity,
      onLoaded: _.identity,
    };
  }

  load(id) {
    const control = this;
    const url = `/media/episode/${id}`;
    const request = createCORSRequest('GET', url);
    request.responseType = 'arraybuffer';

    // decode async
    request.onload = () => {
      control.context.decodeAudioData(request.response).then(buffer => {
        control.audioBuffer = buffer;
        control.onLoaded();
      }).catch(control.onError);
    };

    request.onerror = this.onError.bind(this, 'XHR error loading sound');

    // fire away!
    request.send();
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

  init() {
    // create sound source and set its audio
    const source = this.context.createBufferSource();
    source.buffer = this.audioBuffer;

    // link sound to context's destination (that is, the speakers)
    source.connect(this.context.destination);
    this.source = source;
  }

  playFromTime(time = this.context.currentTime) {
    // make sure source is initiated
    if (!this.source) this.init();

    if (this.isSuspended()) {
      this.resume();
    } else {
      this.source.start(time);
      this.onPlay(time);
    }
  }

  pause() {
    const time = this.context.currentTime;
    this.context.suspend().then(this.onPause(time));
  }

  resume() {
    this.context.resume().then(this.onPlay);
  }

  toggle() {
    switch (this.context.state) {
      case 'suspended':
        this.resume();
        break;
      case 'running':
        this.pause();
        break;
      default:
        console.log('I dunno');
    }
  }

  isSuspended() {
    return this.context.state === 'suspended';
  }

  isRunning() {
    return this.context.state === 'running';
  }

  getTime() {
    return this.context.currentTime;
  }

  destroy() {
    this.context.close();
  }
}

export default AudioControl;
