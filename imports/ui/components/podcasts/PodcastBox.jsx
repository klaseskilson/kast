import React, { Component, PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import styles from './PodcastBox.mss';

class PodcastBox extends Component {
  render() {
    const { collectionName, artistName, artworkUrl100, collectionId } = this.props.podcast;
    const path = FlowRouter.path('itunes', { collectionId });
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
  }
}

PodcastBox.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default PodcastBox;
