import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';

import styles from './Episode.mss';

class Episode extends Component {
  constructor(props) {
    super(props);

    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    const { _id } = this.props.episode;
    const { playing } = Session.get('nowPlaying') || {};
    // TODO: use collection here, too
    Session.set('nowPlaying', {
      episodeId: _id,
      current: true,
      playing: !playing,
    });
  }

  render() {
    const { title, published, image, duration } = this.props.episode;
    const date = moment(published).format('ddd MMM Do YYYY');
    const seconds = duration % 60;
    const length = `${Math.floor(duration / 60)}:${seconds < 10 ? 0 : ''}${seconds}`;
    const style = { backgroundImage: `url(${image})` };

    return (
      <article className={styles.episode}>
        <div className={styles.image} style={style} onClick={this.togglePlay}>
          <i className={`${styles.playback} fa fa-play-circle`}></i>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.date}>{length} - {date}</span>
        </div>
      </article>
    );
  }
}

Episode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default Episode;
