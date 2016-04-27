import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const PlayHistory = new Mongo.Collection('playHistory');
PlayHistory.methods = {};

PlayHistory.schema = new SimpleSchema({
  progress: { type: Number },
  episodeId: { type: String },
  userId: { type: String },
  current: { type: Boolean, defaultValue: false },
  playing: { type: Boolean, defaultValue: false },
});

export default PlayHistory;
