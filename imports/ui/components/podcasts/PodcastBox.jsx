import React, { Component, PropTypes } from 'react';

import styles from './PodcastBox.mss';

class PodcastBox extends Component {
  render() {
    const { collectionName, artistName, artworkUrl600 } = this.props.podcast;
    return (
      <article className={styles.podcastBox}>
        <img src={artworkUrl600} alt={collectionName} />
        <h3>{collectionName}</h3>
        <h4>{artistName}</h4>
      </article>
    );
  }
};

PodcastBox.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default PodcastBox;
