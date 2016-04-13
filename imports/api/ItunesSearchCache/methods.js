import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { EJSON } from 'meteor/ejson';

import ItunesSearchCache from './ItunesSearchCache.js';

ItunesSearchCache.methods = ItunesSearchCache.methods || {};

ItunesSearchCache.methods.search = new ValidatedMethod({
  name: 'ItunesSearchCache.methods.search',

  validate(search) {
    check(search, String);
  },

  run(search) {
    if (this.isSimulation) return [];

    if (ItunesSearchCache.methods.hasCacheForSearch(search)) {
      return ItunesSearchCache.methods.getCacheForSearch(search).searchContent;
    }

    const searchUrl = `https://itunes.apple.com/search?media=podcast&limit=20&term=${search}`;
    try {
      const request = HTTP.get(searchUrl);
      if (request.statusCode === 200) {
        const content = EJSON.parse(request.content);
        ItunesSearchCache.methods.setCacheForSearch(search, content);
        return content;
      }
      throw new Meteor.Error('failed-search', `Failed searching iTunes: ${request.statusCode}`);
    } catch (error) {
      throw error;
    }
  },
});

export default ItunesSearchCache;
