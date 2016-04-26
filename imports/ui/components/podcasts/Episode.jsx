import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { moment } from 'meteor/momentjs:moment';

import Episodes from '../../../api/Episodes/Episodes.js';
import Podcasts from '../../../api/Podcasts/Podcasts.js';
import { FadeInLoader, Spinner } from '../common.jsx';

import styles from './Episode.mss';

const Episode = ({ episode }) => {
  const { title, published, image, duration } = episode;
  const date = moment(published).format('ddd MMM Do YYYY');
  const seconds = duration % 60;
  const length = `${Math.floor(duration / 60)}:${seconds < 10 ? 0 : ''}${seconds}`;

  return (
    <article className={styles.episode}>
      <div className={styles.image} style={{ backgroundImage: `url(${image})` }}>
        <i className={`${styles.playback} fa fa-play-circle`}></i>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{length} - {date}</span>
      </div>
    </article>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

class EpisodeList extends Component {
  constructor(props) {
    super(props);
    this.state = { limit: props.limit, fetchingMore: false };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    const limit = this.state.limit + 20;
    this.setState({ limit, fetchingMore: true });
    Meteor.subscribe('Episodes.pubs.limit', this.props.podcastId, limit, () => {
      // onReady
      this.setState({ fetchingMore: false });
    });
  }

  render() {
    const { loading, episodes, className, episodeCount } = this.props;
    return (
      <FadeInLoader loading={loading}>
        { !episodes ? null : (
          <div className={className || 'episode-list'}>
            { episodes.map(episode => <Episode episode={episode} key={episode.guid} />)}
          </div>
        ) }
        { episodeCount > episodes.length ? (
          <div onClick={this.loadMore} className={styles.loadMore}>
            <Spinner loading={this.state.fetchingMore} icon="chevron-circle-down" /> More
          </div>
        ) : null }
      </FadeInLoader>
    );
  }
}

EpisodeList.propTypes = {
  podcastId: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  episodes: PropTypes.array,
  className: PropTypes.string,
  episodeCount: PropTypes.number,
};

export default createContainer(({ podcastId, className }) => {
  const limit = 20;
  const episodeHandle = Meteor.subscribe('Episodes.pubs.limit', podcastId);
  const loading = !episodeHandle.ready();
  const episodes = Episodes.find({ podcastId }).fetch();
  const { episodeCount } = Podcasts.findOne(podcastId);
  return {
    podcastId,
    limit,
    loading,
    episodes,
    className,
    episodeCount,
  };
}, EpisodeList);
