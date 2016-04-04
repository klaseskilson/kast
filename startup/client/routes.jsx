import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// import our components
import Layout from '/imports/ui/layouts/Layout.jsx';
import Welcome from '/imports/ui/components/welcome.jsx';

FlowRouter.route('/', {
  action() {
    mount(Layout, {
      content: (<Welcome name="User" />),
    });
  },
});
