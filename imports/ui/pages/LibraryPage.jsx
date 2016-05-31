import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, BigHeader, FadeInLoader } from '../components/common.jsx';
import PodcastList from '../components/podcasts/PodcastList.jsx';
import Episode from '../components/podcasts/Episode.jsx';
import Podcasts from '../../api/Podcasts/Podcasts';
import Episodes from '../../api/Episodes/Episodes';

const LibraryPage = ({ loading, podcasts, episodes }) => (<div>
  <BigHeader>
    <h1>Library</h1>
  </BigHeader>
  <FadeInLoader loading={loading}>
    {loading ? null :
      <Container>
        <div className="row">
          <div className="col-4">
            <h2>Latest episodes</h2>
            {episodes.map(
              episode => <Episode episode={episode} key={episode._id} showPodcast />)}
          </div>
          <div className="col-2">
            <h2>Podcasts</h2>
            <PodcastList podcasts={podcasts} />
          </div>
        </div>
      </Container>
    }
  </FadeInLoader>
</div>);

LibraryPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  podcasts: PropTypes.array.isRequired,
  episodes: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const user = Meteor.user();

  const podcastHandle = Meteor.subscribe('Podcasts.pubs.user');
  const episodeHandle = Meteor.subscribe('Episodes.pubs.user');
  const loading = !podcastHandle.ready() || !episodeHandle.ready();
  const podcasts = Podcasts.userPodcasts(user).fetch();
  const episodes = Episodes.find({
    podcastId: {
      $in: user && user.profile.podcastSubscriptions || [],
    },
  }, {
    sort: {
      published: -1,
    },
  }).fetch();

  return {
    loading,
    podcasts,
    episodes,
  };
}, LibraryPage);
