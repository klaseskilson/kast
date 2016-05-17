import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, FadeInLoader, FancyHeader, Spinner } from '../components/common.jsx';
import Podcasts from '../../api/Podcasts/Podcasts.js';
import EpisodeList from '../components/podcasts/EpisodeList.jsx';

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
    const { loading, podcast } = this.props;
    return (
      <FadeInLoader loading={loading}>
        {!podcast ? null : (
          <div>
            <FancyHeader extraClass={styles.header}>
              <div className={styles.title}>
                <h1>{podcast.collectionName}</h1>
                <h2>
                  By <span className={styles.artistName}>{podcast.artistName}</span>
                </h2>
              </div>
            </FancyHeader>
            <Container extraClass={styles.content}>
              <aside className={styles.sidebar}>
                <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
                <div className={styles.sidebarContent}>
                  <button onClick={this.refreshPodcast} className="block">
                    <Spinner icon="refresh" loading={this.state.refreshing} /> Refresh
                  </button>
                  <p>{podcast.description && podcast.description.long || ''}</p>

                  {podcast.link ? (
                    <p><a href={podcast.link}><i className="fa fa-globe"></i> Website</a></p>)
                    : null}
                  {podcast.copyright ? <p className="small">&copy; {podcast.copyright}</p> : null}
                </div>
              </aside>
              <div className={styles.episodeList}>
                <h2 className={styles.episodesTitle}>Episodes</h2>
                <EpisodeList podcastId={podcast._id} />
              </div>
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
