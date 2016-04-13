import ItunesSearchCache from '../ItunesSearchCache.js';

ItunesSearchCache.methods = ItunesSearchCache.methods || {};

const halfDay = 12 * 60 * 60 * 1000;

ItunesSearchCache.methods.hasCacheForSearch = searchString => {
  // only accept cache that is less than half a day old
  const halfDayAgo = new Date();
  halfDayAgo.setTime(Date.now() - halfDay);

  // use count method to look for cache
  return ItunesSearchCache.find({
    searchString,
    createdAt: {
      $gt: halfDayAgo,
    },
  }).count() > 0;
};

ItunesSearchCache.methods.getCacheForSearch = searchString => {
  const halfDayAgo = new Date();
  halfDayAgo.setTime(Date.now() - halfDay);

  // find cache by date and search string
  return ItunesSearchCache.findOne({
    searchString,
    createdAt: {
      $gt: halfDayAgo,
    },
  }, {
    fields: {
      searchContent: 1,
    },
  });
};

ItunesSearchCache.methods.setCacheForSearch = (searchString, searchContent) => {
  const createdAt = new Date();

  console.info('Setting cache for iTunes search', searchString, 'at', createdAt);

  // clean cache
  ItunesSearchCache.remove({
    createdAt: {
      $lt: createdAt,
    },
  });

  // insert new cache
  return ItunesSearchCache.insert({
    searchString,
    searchContent,
    createdAt,
  });
};
