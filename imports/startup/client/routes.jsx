import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import our components
import Layout from '/imports/ui/layouts/Layout.jsx';
import WelcomePage from '/imports/ui/pages/WelcomePage.jsx';
import SignInPage from '/imports/ui/pages/SignInPage.jsx';
import SignUpPage from '/imports/ui/pages/SignUpPage.jsx';
import SettingsPage from '/imports/ui/pages/SettingsPage.jsx';
import SearchPage from '/imports/ui/pages/SearchPage.jsx';
import PodcastPage from '/imports/ui/pages/PodcastPage.jsx';

import { urlDecode } from '/imports/helpers/urlHelpers.js';

const setTitle = title => (document.title = title ? `${title} - Kast` : 'Kast');

FlowRouter.route('/', {
  name: 'home',
  action() {
    setTitle('');
    mount(Layout, {
      content: (<WelcomePage />),
    });
  },
});

const userRoutes = FlowRouter.group({
  prefix: '/user',
  name: 'user',
});

const podcastRoutes = FlowRouter.group({
  prefix: '/podcasts',
  name: 'podcasts',
});

userRoutes.route('/sign_in', {
  name: 'signIn',
  action() {
    setTitle('Sign in');
    mount(Layout, {
      content: (<SignInPage />),
    });
  },
});

userRoutes.route('/sign_up', {
  name: 'signUp',
  action() {
    setTitle('Sign up');
    mount(Layout, {
      content: (<SignUpPage />),
    });
  },
});

userRoutes.route('/sign_out', {
  name: 'signOut',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('home');
    });
  },
});

userRoutes.route('/settings', {
  name: 'settings',
  action() {
    setTitle('Settings');
    mount(Layout, {
      content: (<SettingsPage />),
    });
  },
});

podcastRoutes.route('/search/:search', {
  name: 'search',
  action() {
    let { search } = FlowRouter.current().params;
    search = urlDecode(search);
    setTitle(`"${search}" - Search`);
    mount(Layout, {
      content: (<SearchPage searchString={search} />),
    });
  },
});

podcastRoutes.route('/itunes/:collectionId', {
  name: 'itunes',
  action() {
    const collectionId = FlowRouter.getParam('collectionId');
    mount(Layout, {
      content: (<PodcastPage collectionId={collectionId} />),
    });
  },
});
