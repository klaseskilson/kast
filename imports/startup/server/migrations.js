import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';

import './migrations/index.js';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
