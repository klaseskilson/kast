import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import UserMenu from './UserMenu.jsx';
import MainMenu from './MainMenu.jsx';

const Header = () => (
  <header className="main-header">
    <MainMenu />
    {
      this.currentUser ?
      <UserMenu user={ this.currentUser } /> :
      <a href={FlowRouter.path('signIn')}>Sign in</a>
    }
  </header>
);

Header.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  const currentUser = Meteor.user();
  return {
    currentUser,
  };
}, Header);
