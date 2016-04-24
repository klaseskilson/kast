import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { moment } from 'meteor/momentjs:moment';

import Episodes from '../../../api/Episodes/Episodes.js';
import { FadeInLoader } from '../common.jsx';

import styles from './Episode.mss';

const Episode = ({ episode }) => {
  const { title, published, image, duration } = episode;
  const date = moment(published).format('ddd MMM Do YYYY');
  const seconds = duration % 60;
  const length = `${Math.floor(duration / 60)}:${seconds < 10 ? 0 : ''}${seconds}`;

  return (
    <article className={styles.episode}>
      <div className={styles.image} style={{backgroundImage: `url(${image})`}}>
        <i className={`${styles.playback} fa fa-play-circle`}></i>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{length} - {date}</span>
      </div>
    </article>
  );
};

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

const EpisodeList = ({ loading, episodes, className }) => (
  <FadeInLoader loading={loading}>
    { !episodes ? null : (
      <div className={className || 'episode-list'}>
        { episodes.map(episode => <Episode episode={episode} key={episode.guid} />)}
      </div>
    ) }
  </FadeInLoader>
);

EpisodeList.propTypes = {
  loading: PropTypes.bool.isRequired,
  episodes: PropTypes.array,
  className: PropTypes.string,
};

export default createContainer(({ podcastId, className }) => {
  const episodeHandle = Meteor.subscribe('Episodes.pubs.all', podcastId);
  const loading = !episodeHandle.ready();
  const episodes = Episodes.find({ podcastId }).fetch();
  return {
    loading,
    episodes,
    className,
  };
}, EpisodeList);
