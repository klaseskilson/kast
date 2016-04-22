import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, FadeInLoader, FancyHeader, Spinner } from '../components/common.jsx';
import Podcasts from '../../api/Podcasts/Podcasts.js';
import EpisodeList from '../components/podcasts/Episode.jsx';

import styles from './PodcastPage.mss';

class PodcastPage extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };

    this.refreshPodcast = this.refreshPodcast.bind(this);
  }

  refreshPodcast(event) {
    event.preventDefault();
    if (this.state.refreshing) return;

    this.setState({ refreshing: true });
    const { podcast } = this.props;
    Meteor.call('Episodes.methods.import', podcast._id, () => this.setState({ refreshing: false }));
  }

  render() {
    const { loading, podcast, user } = this.props;
    return (
      <FadeInLoader loading={loading}>
        {!podcast ? null : (
          <div>
            <FancyHeader extraClass={styles.header}>
              <div className={styles.image}>
                <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
              </div>
              <div className={styles.content}>
                <h1>{podcast.collectionName}</h1>
                <h2>
                  By <span className={styles.artistName}>{podcast.artistName}</span>
                </h2>
                <p>{podcast.description && podcast.description.long || ''}</p>
                <div className="buttons">
                  <button onClick={this.refreshPodcast}>
                    <Spinner icon="refresh" loading={this.state.refreshing} />
                    Refresh
                  </button>
                </div>
              </div>
            </FancyHeader>
            <Container>
              <EpisodeList podcastId={podcast._id} />
            </Container>
          </div>
        )}
      </FadeInLoader>
    );
  }
}

PodcastPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  podcast: PropTypes.object,
  user: PropTypes.object,
};

export default createContainer(({ collectionId }) => {
  const collectionHandle = Meteor.subscribe('Podcasts.pubs.collection', collectionId);
  const loading = !collectionHandle.ready();
  const podcast = Podcasts.findOne({ collectionId });
  const user = Meteor.user();
  return {
    loading,
    podcast,
    user,
  };
}, PodcastPage);
