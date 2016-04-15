import { Mongo } from 'meteor/mongo';

const SearchCache = new Mongo.Collection('SearchCache');

SearchCache.methods = {};

export default SearchCache;
