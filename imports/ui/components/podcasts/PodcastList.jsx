import React, { PropTypes } from 'react';

import { NothingFound } from '../common.jsx';
import PodcastBox from './PodcastBox.jsx';

import styles from './PodcastList.mss';

const PodcastList = ({ podcasts, View = PodcastBox }) => {
  // calculate if we should fill the search result with dummy content (ugly and hacky)
  let rest = podcasts.length % 4;
  const dummies = [];
  while (rest--) {
    dummies.push((<article key={`dummy-${rest}`}> </article>));
  }

  // return list of found podcasts or the NothingFound-component
  return podcasts.length === 0 ? (<NothingFound />) : (
    <div className={styles.podcastList}>
      {podcasts.map(podcast => (
        <View podcast={podcast} key={podcast.collectionId} />
      ))}
      {dummies}
    </div>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  View: PropTypes.func,
};

export default PodcastList;
