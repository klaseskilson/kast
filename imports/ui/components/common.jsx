import React, { PropTypes } from 'react';

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
