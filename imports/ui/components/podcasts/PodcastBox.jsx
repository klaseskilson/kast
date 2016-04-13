import React, { Component, PropTypes } from 'react';

class PodcastBox extends Component {
  render() {
    console.log(this.props.podcast);
    return (<pre>{JSON.stringify(this.props.podcast)}</pre>);
  }
};

PodcastBox.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default PodcastBox;
