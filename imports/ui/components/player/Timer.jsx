import React, { PropTypes } from 'react';

import styles from './Timer.mss';

const secondsToTime = seconds => {
  let remainingSeconds = seconds % 60;
  remainingSeconds = `${remainingSeconds < 10 ? 0 : ''}${remainingSeconds}`;
  return `${Math.floor(seconds / 60)}:${remainingSeconds}`;
};

const Timer = ({ duration, currentlyAt }) => {
  const currentlyText = secondsToTime(currentlyAt);
  const durationText = secondsToTime(duration);

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
