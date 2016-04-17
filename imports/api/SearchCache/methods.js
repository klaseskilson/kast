import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { EJSON } from 'meteor/ejson';

import SearchCache from './SearchCache.js';

SearchCache.methods.search = new ValidatedMethod({
  name: 'SearchCache.methods.search',

  validate(search) {
    check(search, String);
  },

  run(search) {
    if (this.isSimulation) return [];

    const searchUrl = 'https://itunes.apple.com/search?' +
      `media=podcast&limit=20&entity=podcast&term=${search}`;
    if (SearchCache.methods.hasCacheForSearch(searchUrl)) {
      return SearchCache.methods.getCacheForSearch(searchUrl).searchContent;
    }

    try {
      const request = HTTP.get(searchUrl);
      if (request.statusCode === 200) {
        const content = EJSON.parse(request.content);
        SearchCache.methods.setCacheForSearch(searchUrl, content);
        return content;
      }
      throw new Meteor.Error('failed-search', `Failed searching iTunes: ${request.statusCode}`);
    } catch (error) {
      throw error;
    }
  },
});

export default SearchCache;
