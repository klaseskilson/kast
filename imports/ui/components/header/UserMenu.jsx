import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { routeMap } from './routeWatcher.jsx';
import styles from './Menu.mss';

const UserMenu = ({ user, currentRoute }) => {
  const routeName = currentRoute.route.name;
  const menuItems = [];
  if (user) {
    menuItems.push({
      route: 'profile',
      title: user.username || user.profile.name || 'Profile',
    }, {
      route: 'settings',
      title: 'Settings',
    }, {
      route: 'signOut',
      title: 'Sign out',
    });
  } else {
    menuItems.push({
      route: 'signIn',
      title: 'Sign in',
    });
  }

  return (
    <nav className={styles.common}>
      {menuItems.map(routeMap.bind(this, routeName, styles))}
    </nav>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object,
  currentRoute: PropTypes.object,
};

export default createContainer(({ currentRoute }) => {
  const user = Meteor.user();
  return { user, currentRoute };
}, UserMenu);
