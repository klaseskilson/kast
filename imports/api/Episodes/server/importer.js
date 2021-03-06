import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import parsePodcast from 'node-podcast-parser';

import Episodes from '../Episodes.js';
import Podcasts from '../../Podcasts/Podcasts.js';

Episodes.methods.import = new ValidatedMethod({
  name: 'Episodes.methods.import',

  validate(podcastId) {
    check(podcastId, String);
  },

  run(podcastId) {
    const { feedUrl } = Podcasts.findOne(podcastId, {
      fields: {
        feedUrl: 1,
      },
    });

    // eslint-disable-next-line no-console
    console.info('Fetching podcast episodes and info from', feedUrl);
    const request = HTTP.get(feedUrl);

    if (request.statusCode === 200) {
      parsePodcast(request.content, (err, data) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(`Error parsing feed ${feedUrl}`, err);
          return;
        }

        const { description, copyright, owner, categories, link } = data;
        const episodeCount = data.episodes.length;
        Podcasts.upsert(podcastId, {
          $set: { description, copyright, owner, categories, link, episodeCount },
        });

        // eslint-disable-next-line no-console
        console.info(`Importing ${episodeCount} episodes for ${podcastId}`);

        data.episodes.forEach(episode => {
          const updatedEpisode = _.extend(episode, {
            updatedAt: new Date(),
          });
          const { guid } = episode;

          // upsert collection!
          Episodes.upsert({ guid, podcastId }, {
            $set: updatedEpisode,
            $setOnInsert: {
              podcastId,
              createdAt: new Date(),
            },
          });
        });
      });
    }
  },
});
