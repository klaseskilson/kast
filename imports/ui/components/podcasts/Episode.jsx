import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Episodes from '../../../api/Episodes/Episodes.js';
import { FadeInLoader } from '../common.jsx';

import styles from './Episode.mss';

const Episode = ({ episode }) => {
  const { title, description, image } = episode;
  return (
    <article className={styles.episode}>
      <div className={styles.image}>
        { image ? <img src={image} alt={title} /> : null }
      </div>
      <div className={styles.info}>
        <h2>{title}</h2>
        { description ? <p>{description}</p> : null }
      </div>
    </article>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

const EpisodeList = ({ loading, episodes }) => (
  <FadeInLoader loading={loading}>
    <h1>Episodes</h1>
    { !episodes ? null : (
      <div>
        { episodes.map(episode => <Episode episode={episode} key={episode.guid} />)}
      </div>
    ) }
  </FadeInLoader>
);

EpisodeList.propTypes = {
  loading: PropTypes.bool.isRequired,
  episodes: PropTypes.array,
};

export default createContainer(({ podcastId }) => {
  const episodeHandle = Meteor.subscribe('Episodes.pubs.all', podcastId);
  const loading = !episodeHandle.ready();
  const episodes = Episodes.find({ podcastId }).fetch();
  return {
    loading,
    episodes,
  };
}, EpisodeList);
