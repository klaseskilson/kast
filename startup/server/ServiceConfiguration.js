import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

['facebook', 'google'].forEach(service => {
  if (!Meteor.settings[service]) return;

  ServiceConfiguration.configurations.upsert({
    service,
  }, {
    $set: {
      clientId: Meteor.settings[service].clientId,
      loginStyle: 'popup',
      secret: Meteor.settings[service].secret,
    },
  });
});
