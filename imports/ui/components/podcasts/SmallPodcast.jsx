import React, { PropTypes, Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import styles from './SmallPodcast.mss';
import { prettyUrl } from '../../../helpers/urlHelpers';
import methods from '../../../api/users/methods';

class SmallPodcast extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  unsubscribe() {
    methods.unSubscribeFromPodcast.call(this.props.podcast._id);
  }

  render() {
    const { collectionName, artworkUrl60, artistName, _id } = this.props.podcast;

    const slug = prettyUrl(collectionName);
    const path = FlowRouter.path('podcast', {
      podcastId: _id,
      slug,
    });

    const style = { backgroundImage: `url(${artworkUrl60})` };

    return (
      <article className={styles.podcast}>
        <a href={path}>
          <div className={styles.image} style={style}></div>
          <div className={styles.info}>
            <span className={styles.title}>{collectionName}</span><br />
            <span className={styles.artist}>{artistName}</span>
          </div>
        </a>
        <div className={styles.trash} title="Unsubscribe from this podcast" onClick={this.unsubscribe}>
          <i className="fa fa-trash"></i>
        </div>
      </article>
    );

  }
}

SmallPodcast.propTypes = {
  podcast: PropTypes.object.isRequired,
};

export default SmallPodcast;
