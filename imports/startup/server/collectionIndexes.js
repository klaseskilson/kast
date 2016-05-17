// add indexes to mongo
import { Meteor } from 'meteor/meteor';
import SearchCache from '../../api/SearchCache/SearchCache.js';
import Podcasts from '../../api/Podcasts/Podcasts.js';

Meteor.startup(() => {
  /* eslint-disable no-console */
  SearchCache.rawCollection().createIndex({
    searchurl: 1,
  }, {
    background: 1,
  }, (error) => {
    if (error) {
      console.error('when index creation attempt:', error);
    }
  });

  Podcasts.rawCollection().createIndex({
    collectionid: 1,
  }, {
    background: 1,
  }, (error) => {
    if (error) {
      console.error('when index creation attempt:', error);
    }
  });
  /* eslint-enable */
});
