import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Episodes from '../../../api/Episodes/Episodes.js';
import Podcasts from '../../../api/Podcasts/Podcasts.js';
import Episode from './Episode.jsx';
import { FadeInLoader, Spinner } from '../common.jsx';

import styles from './Episode.mss';

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
        {!episodes ? null : (
          <div className={className || 'episode-list'}>
            {episodes.map(episode => <Episode episode={episode} key={episode.guid} />)}
          </div>
        )}
        {episodeCount > episodes.length ? (
          <div onClick={this.loadMore} className={styles.loadMore}>
            <Spinner loading={this.state.fetchingMore} icon="chevron-circle-down" /> More
          </div>
        ) : null}
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
  const episodes = Episodes.find({ podcastId }, {
    sort: {
      published: -1,
    },
  }).fetch();
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
