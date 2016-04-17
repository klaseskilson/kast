import { Mongo } from 'meteor/mongo';

const Podcasts = new Mongo.Collection('Podcasts');
Podcasts.methods = {};

export default Podcasts;
