import React, { PropTypes } from 'react';

import styles from './common.mss';

/**
 * create a font-awesome spinning icon if loading is true, otherwise use the icon
 * class provided in icon
 * @param {boolean} loading
 * @param {String} icon
 * @returns {XML}
 * @constructor
 */
export const Spinner = ({ loading, icon }) => {
  const className = `fa fa-${loading ? 'circle-o-notch fa-spin' : icon}`;
  return (
    <i className={className}> </i>
  );
};

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
};

/**
 * container for making it easy to width-limit component's content
 * @param {Array.<Component>} children
 * @param {String} [extraClass='']
 * @constructor
 */
export const Container = ({ children, extraClass }) => (
  <div className={`${styles.container} ${extraClass || ''}`}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  extraClass: PropTypes.string,
};

export const NothingFound = () => (
  <div className={styles.nothingFound}>
    We found nothing :(
  </div>
);
