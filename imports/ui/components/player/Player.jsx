import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { _ } from 'meteor/stevezhu:lodash';
import { createContainer } from 'meteor/react-meteor-data';

import PlayHistory from '/imports/api/PlayHistory/PlayHistory.js';
import Episodes from '/imports/api/Episodes/Episodes.js';
import Podcasts from '/imports/api/Podcasts/Podcasts.js';
import AudioControl from '../../../api/Audio/AudioControl.js';

import { Spinner } from '../common.jsx';
import ProgressBar from './ProgressBar.jsx';
import Timer from './Timer.jsx';

import styles from './Player.mss';

class Player extends Component {
  constructor(props) {
    super(props);
    const { progress } = props.nowPlaying || {};
    this.state = { loadingSound: true, playing: false, progress: progress || 0 };
    this.toggle = this.toggle.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.setupAudio();
    this.saveProgres = _.debounce(this.storeProgress.bind(this), 5000, {
      //maxWait: 60000,
    });
  }

  componentWillReceiveProps(newProps) {
    if (!this.urlExists(newProps)) {
      return;
    }

    if (this.shouldResetSound(newProps)) {
      this.control.destroy();
      this.setState({ loadingSound: true, playing: false });
      this.setupAudio();
    }

    if (!this.urlIsChanged(newProps)) {
      const { progress } = newProps.nowPlaying;
      console.log('url is unchanged. progress:', progress);
      this.control.seek(progress);
    } else {
      const { url } = newProps.episode.enclosure;
      this.control.load(url);
      this.setState({ loadingSound: true });
    }
  }

  onLoaded() {
    this.setState({ loadingSound: false });
    const { progress } = this.props.nowPlaying;
    this.control.seek(progress);
    this.control.play();
  }

  onPlay() {
    this.setState({ playing: this.control.isRunning() });
    this.updateProgress();
  }

  onPause() {
    this.setState({ playing: this.control.isRunning() });
    this.saveProgres.cancel();
    this.storeProgress(this.control.getTime());
  }

  setupAudio() {
    this.control = new AudioControl();
    this.control.cb.onLoaded = this.onLoaded.bind(this);
    this.control.cb.onPlay = this.onPlay.bind(this);
    this.control.cb.onPause = this.onPause.bind(this);
  }

  updateProgress() {
    this.saveProgres(this.control.getTime());
    this.setState({ progress: this.control.getTime() });
    if (this.control.isRunning()) {
      // update again in 1 second
      setTimeout(this.updateProgress, 1000);
    }
  }

  storeProgress(time) {
    console.log('Saving time');
    if (Meteor.user()) {
      // update collection!
    } else {
      const nowPlaying = Session.get('nowPlaying');
      _.extend(nowPlaying, {
        progress: time,
        playing: this.control.isRunning(),
      });
      Session.set('nowPlaying', nowPlaying);
    }
  }

  toggle() {
    this.control.toggle();
  }

  urlExists(props) {
    return !!(props.episode && props.episode.enclosure && props.episode.enclosure.url);
  }

  shouldResetSound(newProps) {
    // check if we have old url, if no, no need to reset
    if (!this.urlExists(this.props)) {
      return false;
    }

    return this.urlIsChanged(newProps.episode.enclosure);
  }

  urlIsChanged(newEnclosure) {
    const oldUrl = _.get(this.props, 'episode.enclosure.url', null);
    const newUrl = newEnclosure.url;
    return oldUrl !== newUrl;
  }

  render() {
    const { loading, episode, podcast, nowPlaying } = this.props;

    if (!episode || !podcast) {
      return null;
    }

    if (loading) {
      return (
        <div className={styles.player}>
          loading...
        </div>
      );
    }

    const image = episode.image || podcast.artworkUrl100;
    const { progress } = this.state;
    const { duration } = episode;
    const icon = this.state.playing ? 'pause' : 'play';
    const { loadingSound } = this.state;

    return (
      <div className={styles.player}>
        <div className={styles.controls}>
          <i className="fa fa-undo"></i>
          <Spinner icon={icon} loading={loadingSound} className={styles.pause} onClick={this.toggle} />
          <i className="fa fa-repeat"></i>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
        <div className={styles.info}>
          <div className={styles.nowPlaying}>
            <span className={styles.titleAndCollection}>
              <span className={styles.title}>{episode.title}</span> &ndash; {podcast.collectionName}
            </span>
            <Timer duration={duration} currentlyAt={progress} />
          </div>
          <ProgressBar duration={duration} currentlyAt={progress} />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  userId: PropTypes.string,
  episode: PropTypes.object,
  podcast: PropTypes.object,
  nowPlaying: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  const userId = Meteor.userId();

  const playHistoryHandle = Meteor.subscribe('PlayHistory.pubs.current', userId);
  const nowPlaying = userId ? PlayHistory.findOne({ current: true }) : Session.get('nowPlaying');
  const { episodeId } = nowPlaying || {};

  const episodeHandle = Meteor.subscribe('Episodes.pubs.single', episodeId);
  const episode = Episodes.findOne(episodeId) || {};

  const podcastHandle = Meteor.subscribe('Podcasts.pubs.single', episode.podcastId);
  const podcast = Podcasts.findOne(episode.podcastId);

  const loading = !playHistoryHandle.ready()
    && !episodeHandle.ready()
    && !podcastHandle.ready();

  return {
    userId,
    episode,
    podcast,
    loading,
    nowPlaying,
  };
}, Player);
