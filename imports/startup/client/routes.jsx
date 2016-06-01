import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import our components
import Layout from '../../ui/layouts/Layout.jsx';
import WelcomePage from '../../ui/pages/WelcomePage.jsx';
import SignInPage from '../../ui/pages/SignInPage.jsx';
import SettingsPage from '../../ui/pages/SettingsPage.jsx';
import SearchPage from '../../ui/pages/SearchPage.jsx';
import PodcastPage from '../../ui/pages/PodcastPage.jsx';
import LibraryPage from '../../ui/pages/LibraryPage.jsx';

import { urlDecode } from '../../helpers/urlHelpers.js';

import Podcasts from '../../api/Podcasts/Podcasts.js';

/**
 * set page title
 * @param {String} title
 */
const setTitle = title => (document.title = title ? `${title} - Kast` : 'Kast');

/**
 * set page title from subscription
 * @param {String} sub            name of subscription
 * @param {String} param          param to send to subscription
 * @param {function} titleMethod  method to find title
 */
const setDataTitle = (sub, param, titleMethod) => {
  Meteor.subscribe(sub, param, () => {
    setTitle(titleMethod());
  });
};

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

podcastRoutes.route('/', {
  name: 'library',
  action() {
    setTitle('My library');
    mount(Layout, {
      content: (<LibraryPage />),
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

podcastRoutes.route('/itunes/:collectionId/:slug', {
  name: 'itunes',
  action() {
    const collectionId = FlowRouter.getParam('collectionId');
    setDataTitle('Podcasts.pubs.collection', collectionId, () =>
      Podcasts.findOne({ collectionId }).collectionName);
    mount(Layout, {
      content: (<PodcastPage collectionId={collectionId} />),
    });
  },
});

podcastRoutes.route('/:podcastId/:slug', {
  name: 'podcast',
  action() {
    const podcastId = FlowRouter.getParam('podcastId');
    setDataTitle('Podcasts.pubs.single', podcastId,
      () => Podcasts.findOne(podcastId).collectionName);
    mount(Layout, {
      content: (<PodcastPage podcastId={podcastId} />),
    });
  },
});
