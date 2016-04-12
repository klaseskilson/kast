import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter, path } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

import { routeMap } from './routeWatcher.jsx';
import styles from './Menu.mss';

const loggedInMenuItems = [
  {
    route: 'settings',
    title: 'Settings',
  },
  {
    route: 'signOut',
    title: 'Sign out',
  },
];
const loggedOutMenuItems = [
  {
    route: 'signIn',
    title: 'Sign in',
  },
];

const UserMenu = ({ user, currentRoute }) => {
  const routeName = currentRoute.route.name;
  const loggedInContent = user && (
    <nav className={styles.common}>
      <div className={styles['nav-item']}>
        { user.username }
      </div>
      { loggedInMenuItems.map(routeMap.bind(this, routeName, styles)) }
    </nav>
  );
  const loggedOutContent = (
    <nav className={styles.common}>
      { loggedOutMenuItems.map(routeMap.bind(this, routeName, styles)) }
    </nav>
  );

  return user ? loggedInContent : loggedOutContent;
};

UserMenu.propTypes = {
  user: PropTypes.object,
};

export default createContainer(({ currentRoute }) => {
  const user = Meteor.user();
  return { user, currentRoute };
}, UserMenu);
