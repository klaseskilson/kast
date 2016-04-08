import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import our components
import Layout from '/imports/ui/layouts/Layout.jsx';
import WelcomePage from '/imports/ui/pages/WelcomePage.jsx';
import SignInPage from '/imports/ui/pages/SignInPage.jsx';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(Layout, {
      content: (<WelcomePage />),
    });
  },
});

FlowRouter.route('/sign_in', {
  name: 'signIn',
  action() {
    mount(Layout, {
      content: (<SignInPage />),
    });
  },
});
