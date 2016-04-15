import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, Spinner } from '../components/common.jsx';
import Podcasts from '../../api/Podcasts/Podcasts.js';

const PodcastPage = ({ loading, podcast }) => (
  <Container>
    <h1>{ loading ? <Spinner loading={loading} icon="nah" /> : 'loaded' }</h1>
    <pre>
      {JSON.stringify(podcast)}
    </pre>
  </Container>
);

PodcastPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  podcast: PropTypes.object,
};

export default createContainer(({ collectionId }) => {
  const collectionHandle = Meteor.subscribe('Podcasts.pubs.collection', collectionId);
  const loading = !collectionHandle.ready();
  const podcast = Podcasts.findOne({ collectionId });
  return {
    loading,
    podcast,
  };
}, PodcastPage);
