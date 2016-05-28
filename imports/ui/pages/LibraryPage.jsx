import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, BigHeader, FadeInLoader } from '../components/common.jsx';
import PodcastList from '../components/podcasts/PodcastList.jsx';
import Podcasts from '../../api/Podcasts/Podcasts';
import Episodes from '../../api/Episodes/Episodes';

const LibraryPage = ({ loading, podcasts, episodes }) => (<div>
  <BigHeader>
    <h1>Library</h1>
  </BigHeader>
  <FadeInLoader loading={loading}>
    {loading ? null :
      <Container>
        <h1>Podcasts</h1>
        <PodcastList podcasts={podcasts} />
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
  const episdoes = Episodes.find();

  return {
    loading,
    podcasts,
    episodes,
  };
}, LibraryPage);
