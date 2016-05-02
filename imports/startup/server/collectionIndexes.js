// add indexes to mongo
import { Meteor } from 'meteor/meteor';
import SearchCache from '../../api/SearchCache/SearchCache.js';
import Podcasts from '../../api/Podcasts/Podcasts.js';

Meteor.startup(() => {
  /* eslint-disable no-console */
  //console.info('Creating indexes for collections...');
  SearchCache.rawCollection().createIndex({
    searchUrl: 1,
  }, {
    background: 1,
  }, (error, indexName) => {
    if (error) {
      console.error('When index creation attempt:', error);
    } else {
      //console.info('... created index for SearchCache:', indexName);
    }
  });

  Podcasts.rawCollection().createIndex({
    collectionId: 1,
  }, {
    background: 1,
  }, (error, indexName) => {
    if (error) {
      console.error('When index creation attempt:', error);
    } else {
      //console.info('... created index for Podcasts:', indexName);
    }
  });
  /* eslint-enable */
});
