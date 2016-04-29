// setup service client id/secrets
import './ServiceConfiguration.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import '../../api/api.js';
import '../../api/Episodes/server/publications.js';
import '../../api/Episodes/server/importer.js';
import '../../api/PlayHistory/server/publications.js';
import '../../api/Podcasts/server/publications.js';
import '../../api/Podcasts/server/podcastFetcher.js';
import '../../api/SearchCache/server/cacheChecker.js';

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
