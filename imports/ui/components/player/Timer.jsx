import React, { PropTypes } from 'react';

import styles from './Timer.mss';

const Timer = ({ duration, currentlyAt }) => {
  let currentSeconds = currentlyAt % 60;
  currentSeconds = `${currentSeconds < 10 ? 0 : ''}${currentSeconds}`;
  const currentlyText = `${Math.floor(currentlyAt / 60)}:${currentSeconds}`;
  let durationSeconds = duration % 60;
  durationSeconds = `${durationSeconds < 10 ? 0 : ''}${durationSeconds}`;
  const durationText = `${Math.floor(duration / 60)}:${durationSeconds}`;

  return (
    <span className={styles.time}>
      <span className={styles.current}>{currentlyText}</span> / {durationText}
    </span>
  );
};

Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  currentlyAt: PropTypes.number.isRequired,
};

export default Timer;
