import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/stevezhu:lodash';

const Podcasts = new Mongo.Collection('Podcasts');
Podcasts.methods = {};

Podcasts.userPodcasts = (user = Meteor.user(), search = {}, options = {}) => {
  const { profile } = user || {};
  const query = _.extend(search, {
    _id: {
      $in: profile && profile.podcastSubscriptions || [],
    },
  });
  return Podcasts.find(query, options);
};

export default Podcasts;
