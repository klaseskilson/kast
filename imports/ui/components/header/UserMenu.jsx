import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter, path } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

import styles from './Menu.mss';

const UserMenu = ({ user }) => {
  const loggedInContent = user && (
    <nav className={styles.userMenu}>
      { user.username }
      <a href={FlowRouter.path('settings')}>Settings</a>
      <a href={FlowRouter.path('signOut')}>Sign out</a>
    </nav>
  );
  const loggedOutContent = (
    <nav className={styles.userMenu}>
      <a href={FlowRouter.path('signIn')}>Sign in</a>
    </nav>
  );

  return user ? loggedInContent : loggedOutContent;
};

UserMenu.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  const user = Meteor.user();
  return { user };
}, UserMenu);
