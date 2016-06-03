import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

import AudioManager from '../../../api/Audio/AudioManager.js';
import Podcasts from '../../../api/Podcasts/Podcasts';
import PlayHistory from '../../../api/PlayHistory/methods';
import { prettyUrl } from '../../../helpers/urlHelpers';

import styles from './Episode.mss';

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.togglePlayedStatus = this.togglePlayedStatus.bind(this);
  }

  togglePlay() {
    const { _id } = this.props.episode;
    AudioManager.setEpisode(_id);
  }

  togglePlayedStatus() {
    const { _id } = this.props.episode;
    PlayHistory.methods.togglePlayedStatus.call(_id);
  }

  toggleInfo() {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  }

  render() {
    let podcastInfo = null;
    const { showPodcast, loadingPodcast, podcast } = this.props;
    if (showPodcast && !loadingPodcast && podcast) {
      const slug = prettyUrl(podcast.collectionName);
      const path = FlowRouter.path('podcast', {
        podcastId: podcast._id,
        slug,
      });
      podcastInfo = (
        <a href={path}>{podcast.collectionName}</a>
      );
    }

    const { title, published, duration, description, enclosure } = this.props.episode;
    let { image } = this.props.episode;
    if (!image && podcast) {
      image = podcast.artworkUrl100;
    }
    const date = moment(published).format('ddd MMM Do YYYY');
    const seconds = duration % 60;
    const length = `${Math.floor(duration / 60)}:${seconds < 10 ? 0 : ''}${seconds}`;
    const style = { backgroundImage: `url(${image})` };
    const size = enclosure.filesize ? `(${Math.floor(enclosure.filesize / 1000000)} MB)` : '';
    const link = (
      <a href={enclosure.url}>
        <i className="fa fa-cloud-download"></i> Download {size}
      </a>
    );

    const markup = () => {
      let trimmed = 'Not provided.';
      if (description) {
        trimmed = description.replace(/<(?!br\s*\/?)[^>]+>/ig, '').replace(/\n\r/g, '<br>');
      }

      return { __html: trimmed };
    };

    let extraClass = '';
    let playedIcon = 'check';
    let playedText = 'Mark as played';
    if (this.props.isPlaying) {
      extraClass += ` ${styles.nowPlaying}`;
    }
    if (this.props.history) {
      extraClass += ` ${styles.played}`;
      playedIcon = 'times-circle';
      playedText = 'Mark as unplayed';
    }
    if (this.props.user) {
      extraClass += ` ${styles.loggedIn}`;
    }

    return (
      <article className={`${styles.episode} ${extraClass}`}>
        <div className={styles.titleLine}>
          <div className={styles.image} style={style} onClick={this.togglePlay}>
            <i className={`${styles.playback} fa fa-play-circle`}></i>
          </div>
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <span className={styles.date}>
              {podcastInfo} {length} - {date}
            </span>
          </div>
          {!this.props.user ? null : (
            <div className={styles.button} onClick={this.togglePlayedStatus} title={playedText}>
              <i className={`fa fa-${playedIcon}`}></i>
            </div>
          )}
          <div className={styles.button} onClick={this.toggleInfo}>
            <i className="fa fa-info-circle"></i>
          </div>
        </div>
        {!this.state.showInfo ? null : (
          <div className={styles.moreInfo}>
            <div className="row">
              <div className="col-2">
                <h3>Published</h3>
                {date}
                <h3>Duration</h3>
                {length}
                <h3>Download</h3>
                {link}
              </div>
              <div className="col-4">
                <h3>Description</h3>
                <div dangerouslySetInnerHTML={markup()}></div>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
  podcast: PropTypes.object.isRequired,
  loadingPodcast: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  showPodcast: PropTypes.bool.isRequired,
  history: PropTypes.object,
  user: PropTypes.object,
};

export default createContainer(({ episode, showPodcast = false }) => {
  const user = Meteor.user();
  const podcastHandle = Meteor.subscribe('Podcasts.pubs.single', episode.podcastId);
  Meteor.subscribe('PlayHistory.pubs.playedEpisode', episode._id);
  const loadingPodcast = !podcastHandle.ready();
  const podcast = Podcasts.findOne(episode.podcastId);
  const history = PlayHistory.findOne({
    episodeId: episode._id,
    userId: user && user._id,
    playedAt: {
      $exists: true,
    },
  });

  return {
    isPlaying: AudioManager.isCurrentEpisode(episode._id),
    episode,
    showPodcast,
    loadingPodcast,
    podcast,
    history,
    user,
  };
}, Episode);
