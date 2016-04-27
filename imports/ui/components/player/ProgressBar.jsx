import React, { PropTypes } from 'react';

import styles from './ProgressBar.mss';

const ProgressBar = ({ currentlyAt, duration }) => {
  const progress = 100 * currentlyAt / duration;

  return (
    <div className={styles.progress}>
      <div className={styles.bar}></div>
      <div className={styles.filledBar} style={{ width: `${progress}%` }}></div>
      <div className={styles.indicator} style={{ left: `${progress}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentlyAt: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default ProgressBar;
