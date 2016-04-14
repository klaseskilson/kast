import { Mongo } from 'meteor/mongo';

const SearchCache = new Mongo.Collection('SearchCache');

export default SearchCache;
