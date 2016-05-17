// setup service client id/secrets
import './ServiceConfiguration.js';
import './collectionIndexes.js';

// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import '../../api/api.js';
import '../../api/Episodes/server/publications.js';
import '../../api/Episodes/server/importer.js';
import '../../api/PlayHistory/server/publications.js';
import '../../api/Podcasts/server/publications.js';
import '../../api/Podcasts/server/podcastFetcher.js';
import '../../api/SearchCache/server/cacheChecker.js';
