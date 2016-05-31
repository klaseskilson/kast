import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

import AudioManager from '../../../api/Audio/AudioManager.js';
import Podcasts from '../../../api/Podcasts/Podcasts';
import { prettyUrl } from '../../../helpers/urlHelpers';

import styles from './Episode.mss';

class Episode extends Component {
  constructor(props) {
    super(props);

    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    const { _id } = this.props.episode;
    AudioManager.setEpisode(_id);
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

    const { title, published, duration } = this.props.episode;
    let { image } = this.props.episode;
    if (!image && podcast) {
      image = podcast.artworkUrl100;
    }
    const date = moment(published).format('ddd MMM Do YYYY');
    const seconds = duration % 60;
    const length = `${Math.floor(duration / 60)}:${seconds < 10 ? 0 : ''}${seconds}`;
    const style = { backgroundImage: `url(${image})` };

    return (
      <article className={styles.episode}>
        <div className={styles.image} style={style} onClick={this.togglePlay}>
          <i className={`${styles.playback} fa fa-play-circle`}></i>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.date}>
            {podcastInfo} {length} - {date}
          </span>
        </div>
      </article>
    );
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
  podcast: PropTypes.object.isRequired,
  loadingPodcast: PropTypes.bool.isRequired,
  showPodcast: PropTypes.bool.isRequired,
};

export default createContainer(({ episode, showPodcast = false }) => {
  const podcastHandle = Meteor.subscribe('Podcasts.pubs.single', episode.podcastId);
  const loadingPodcast = !podcastHandle.ready();
  const podcast = Podcasts.findOne(episode.podcastId);

  return {
    episode,
    showPodcast,
    loadingPodcast,
    podcast,
  };
}, Episode);
