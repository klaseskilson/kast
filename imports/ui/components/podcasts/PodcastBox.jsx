import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { prettyUrl } from '../../../helpers/urlHelpers.js';

import styles from './PodcastBox.mss';

const PodcastBox = props => {
  const { collectionName, artistName, artworkUrl100, collectionId } = props.podcast;
  const slug = prettyUrl(collectionName);
  const path = FlowRouter.path('itunes', { collectionId, slug });
  return (
    <article className={styles.podcastBox}>
      <img src={artworkUrl100} alt={collectionName} />
      <h3>
        <span>{collectionName}</span>
      </h3>
      <h4 title={artistName}>{artistName}</h4>
      <a href={path}>
        <i className="fa fa-list"></i> Episodes
      </a>
    </article>
  );
};

PodcastBox.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default PodcastBox;
