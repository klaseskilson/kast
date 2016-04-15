import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const SearchCache = new Mongo.Collection('SearchCache');
SearchCache.methods = {};

SearchCache.schema = new SimpleSchema({
  searchUrl: { type: String },
  searchContent: { type: [Object] },
  createdAt: { type: Object },
});

export default SearchCache;
