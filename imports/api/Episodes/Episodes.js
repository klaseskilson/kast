import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Episodes = new Mongo.Collection('Episodes');
Episodes.methods = {};

Episodes.schema = new SimpleSchema({
  podcastId: { type: String },
});

export default Episodes;
