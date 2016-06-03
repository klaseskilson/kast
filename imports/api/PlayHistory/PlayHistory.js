import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const PlayHistory = new Mongo.Collection('playHistory');
PlayHistory.methods = {};

PlayHistory.schema = new SimpleSchema({
  episodeId: { type: String },
  userId: { type: String },
  progress: { type: Number, defaultValue: 0 },
  current: { type: Boolean, defaultValue: false },
  playing: { type: Boolean, defaultValue: false },
  playedAt: { type: Date, optional: true },
});

PlayHistory.attachSchema(PlayHistory.schema);

export default PlayHistory;
