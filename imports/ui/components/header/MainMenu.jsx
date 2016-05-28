import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { routeMap } from './routeWatcher.jsx';
import SearchForm from './SearchForm.jsx';
import styles from './Menu.mss';

const MainMenu = ({ currentRoute, menuItems }) => {
  const routeName = currentRoute.route.name;
  return (
    <nav className={styles.common}>
      {menuItems.map(routeMap.bind(this, routeName, styles))}
      <SearchForm />
    </nav>
  );
};

MainMenu.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  menuItems: PropTypes.array.isRequired,
};

export default createContainer(({ currentRoute }) => {
  const menuItems = [
    {
      route: 'home',
      title: 'Kast',
    },
  ];

  if (Meteor.user()) {
    menuItems.push({
      route: 'library',
      title: 'Your library',
    });
  }

  return {
    currentRoute,
    menuItems,
  };
}, MainMenu);
