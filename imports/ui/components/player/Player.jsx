import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import PlayHistory from '/imports/api/PlayHistory/PlayHistory.js';
import Episodes from '/imports/api/Episodes/Episodes.js';
import Podcasts from '/imports/api/Podcasts/Podcasts.js';
import AudioControl from './AudioControl.js';

import { Spinner } from '../common.jsx';
import ProgressBar from './ProgressBar.jsx';
import Timer from './Timer.jsx';

import styles from './Player.mss';

class Player extends Component {
  constructor(props) {
    super(props);

    this.control = new AudioControl();
    //this.control = null;
  }

  componentWillReceiveProps(newProps) {
    if (!this.urlExists(newProps)) {
      return;
    }

    if (this.shouldResetSound(newProps)) {
      this.control.destroy();
      this.control = new AudioControl();
    }

    const { _id } = newProps.episode;
    this.control.load(_id);
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
    const { enclosure } = this.props.episode;
    return enclosure.url !== newEnclosure.url;
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
    const currentlyAt = nowPlaying.progress;
    const { duration } = episode;

    return (
      <div className={styles.player}>
        <div className={styles.controls}>
          <i className="fa fa-undo"></i>
          <Spinner icon="pause" loading={false} className={styles.pause} />
          <i className="fa fa-repeat"></i>
        </div>
        <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
        <div className={styles.info}>
          <div className={styles.nowPlaying}>
            <span className={styles.titleAndCollection}>
              <span className={styles.title}>{episode.title}</span> &ndash; {podcast.collectionName}
            </span>
            <Timer duration={duration} currentlyAt={currentlyAt} />
          </div>
          <ProgressBar duration={duration} currentlyAt={currentlyAt} />
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
