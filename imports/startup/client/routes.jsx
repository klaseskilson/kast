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

FlowRouter.route('/sign_in', {
  name: 'signIn',
  action() {
    setTitle('Sign in');
    mount(Layout, {
      content: (<SignInPage />),
    });
  },
});

FlowRouter.route('/sign_up', {
  name: 'signUp',
  action() {
    setTitle('Sign up');
    mount(Layout, {
      content: (<SignUpPage />),
    });
  },
});

FlowRouter.route('/sign_out', {
  name: 'signOut',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('home');
    });
  },
});

FlowRouter.route('/settings', {
  name: 'settings',
  action() {
    setTitle('Settings');
    mount(Layout, {
      content: (<SettingsPage />),
    });
  },
});

FlowRouter.route('/search/:search', {
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
