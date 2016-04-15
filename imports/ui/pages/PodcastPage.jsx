import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container, Spinner, FadeInLoader } from '../components/common.jsx';
import Podcasts from '../../api/Podcasts/Podcasts.js';

class PodcastPage extends Component {
  render() {
    const { loading, podcast } = this.props;
    return (
      <FadeInLoader loading={loading}>
        {!podcast ? null : (
          <Container>
            <h1>{podcast.collectionName}</h1>
          </Container>
        )}
      </FadeInLoader>
    );
  }
}

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
