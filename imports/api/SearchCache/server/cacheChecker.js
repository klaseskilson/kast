import SearchCache from '../SearchCache.js';

SearchCache.methods = SearchCache.methods || {};

const halfDay = 12 * 60 * 60 * 1000;

SearchCache.methods.hasCacheForSearch = searchUrl => {
  // only accept cache that is less than half a day old
  const halfDayAgo = new Date();
  halfDayAgo.setTime(Date.now() - halfDay);

  // use count method to look for cache
  return SearchCache.find({
    searchUrl,
    createdAt: {
      $gt: halfDayAgo,
    },
  }).count() > 0;
};

SearchCache.methods.getCacheForSearch = searchUrl => {
  const halfDayAgo = new Date();
  halfDayAgo.setTime(Date.now() - halfDay);

  // find cache by date and search string
  return SearchCache.findOne({
    searchUrl,
    createdAt: {
      $gt: halfDayAgo,
    },
  }, {
    fields: {
      searchContent: 1,
    },
  });
};

SearchCache.methods.setCacheForSearch = (searchUrl, searchContent) => {
  const createdAt = new Date();

  // eslint-disable-next-line no-console
  console.info('Setting cache for iTunes search', searchUrl, 'at', createdAt);

  // clean cache
  SearchCache.remove({
    createdAt: {
      $lt: createdAt,
    },
  });

  // insert new cache
  return SearchCache.insert({
    searchUrl,
    searchContent,
    createdAt,
  });
};
