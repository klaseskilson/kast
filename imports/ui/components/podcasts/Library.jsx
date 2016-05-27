import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// fuzzy search
import { mostSimilarString } from 'meteor/perak:fuzzy-search';

import Podcasts from '../../../api/Podcasts/Podcasts';
import { FadeInLoader } from '../../components/common.jsx';

const Library = ({ user, loading, podcasts }) => (user ? (
  <div>
    <h2>Your library</h2>
    <FadeInLoader loading={loading}>
      {loading ? null :
        <div>
          {podcasts.length}
        </div>
      }
    </FadeInLoader>
  </div>
) : null);

Library.propTypes = {
  podcasts: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
};

export default createContainer(({ search }) => {
  const user = Meteor.user();
  const podcastHandle = Meteor.subscribe('Podcasts.pubs.user');
  const loading = !podcastHandle.ready();
  const query = new RegExp(`.*${search}.*`, 'i');
  let podcasts = Podcasts.userPodcasts(user, {
    $or: [
      { collectionName: query },
      { artistName: query },
    ],
  });

  if (podcasts.count() === 0) {
    const bestArtistName = mostSimilarString(podcasts, 'artistName', search);
    const bestCollectionName = mostSimilarString(podcasts, 'collectionName', search);
    // eslint-disable-next-line no-console
    console.log(podcasts, bestArtistName, bestCollectionName);
  }

  podcasts = podcasts.fetch();

  return {
    user,
    loading,
    podcasts,
  };
}, Library);
