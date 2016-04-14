// setup service client id/secrets
import './ServiceConfiguration.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import '../../api/api.js';
import '../../api/SearchCache/server/cacheChecker.js';

// add indexes to mongo
import { Meteor } from 'meteor/meteor';
import SearchCache from '../../api/SearchCache/SearchCache.js';

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.info('Creating indexes for collections...');
  SearchCache.rawCollection().createIndex({
    searchUrl: 1,
  }, {
    background: 1,
  }, (error, indexName) => {
    if (error) {
      console.error('When index creation attempt:', error);
    } else {
      console.info('... created index for SearchCache:', indexName);
    }
  });
  /* eslint-enable */
});
