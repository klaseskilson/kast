import { Mongo } from 'meteor/mongo';

const ItunesSearchCache = new Mongo.Collection('ItunesSearchCache');

export default ItunesSearchCache;
