import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import { EJSON } from 'meteor/ejson';

import Podcasts from '../Podcasts.js';
import '../methods.js';

Podcasts.methods.fetchPodcast = new ValidatedMethod({
  name: 'Podcasts.methods.fetchPodcast',

  validate(collectionId) {
    check(collectionId, String);
  },

  /**
   * fetch podcast info from itunes and upsert collection
   * @param {String} collectionId the itunes collection id
   */
  run(collectionId) {
    const lookupUrl = `https://itunes.apple.com/lookup?id=${collectionId}`;

    try {
      const request = HTTP.get(lookupUrl);
      if (request.statusCode === 200) {
        const content = EJSON.parse(request.content);

        if (content.resultCount === 0) {
          return;
        }

        const podcast = content.results[0];
        podcast.updatedAt = new Date();
        podcast.collectionId = collectionId;

        // eslint-disable-next-line no-console
        console.info('Fetched new podcast info for collectionID', collectionId);

        Podcasts.upsert({
          collectionId,
        }, {
          $set: podcast,
          $setOnInsert: {
            createdAt: new Date(),
          },
        });
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.error('Failed fetching podcast info:', error);
      console.trace();
      /* eslint-enable */
    }
  },
});

export default Podcasts;
