import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

['google'].forEach(service => {
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

// facebook needs to be treated specially
if (Meteor.settings.facebook) {
  ServiceConfiguration.configurations.upsert({
    service: 'facebook',
  }, {
    $set: {
      appId: Meteor.settings.facebook.clientId,
      loginStyle: 'popup',
      secret: Meteor.settings.facebook.secret,
    },
  });
}
