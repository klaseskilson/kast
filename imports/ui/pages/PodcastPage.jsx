import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/stevezhu:lodash';

import { Container, FadeInLoader, FancyHeader, Spinner } from '../components/common.jsx';
import Podcasts from '../../api/Podcasts/Podcasts.js';
import EpisodeList from '../components/podcasts/EpisodeList.jsx';
import methods from '../../api/users/methods.js';

import styles from './PodcastPage.mss';

class PodcastPage extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false, subscribing: false };

    this.refreshPodcast = this.refreshPodcast.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  refreshPodcast(event) {
    event.preventDefault();
    if (this.state.refreshing) return;

    this.setState({ refreshing: true });
    const { podcast } = this.props;
    Meteor.call('Episodes.methods.import', podcast._id,
      () => this.setState({ refreshing: false }));
  }

  subscribe(event) {
    event.preventDefault();
    const { _id } = this.props.podcast;
    methods.subscribeToPodcast.call(_id);
  }

  render() {
    const { loading, podcast, user } = this.props;
    const icon = user && _.includes(user.subscriptions, podcast && podcast._id) ? 'check' : 'plus';
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
                  <button onClick={this.subscribe} className="block green">
                    <Spinner icon={icon} loading={this.state.subscribing} /> Subscribe
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

export default createContainer(({ collectionId, podcastId }) => {
  let collectionHandle;
  let loading;
  let podcast;
  if (collectionId) {
    collectionHandle = Meteor.subscribe('Podcasts.pubs.collection', collectionId);
    loading = !collectionHandle.ready();
    podcast = Podcasts.findOne({ collectionId });
  } else {
    collectionHandle = Meteor.subscribe('Podcasts.pubs.single', podcastId);
    loading = !collectionHandle.ready();
    podcast = Podcasts.findOne(podcastId);
  }
  const user = Meteor.user();
  return {
    loading,
    podcast,
    user,
  };
}, PodcastPage);
