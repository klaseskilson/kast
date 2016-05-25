import React, { PropTypes } from 'react';

import { routeMap } from './routeWatcher.jsx';

import SearchForm from './SearchForm.jsx';

import styles from './Menu.mss';

const menuItems = [
  {
    route: 'home',
    title: 'Kast',
  },
];

const MainMenu = ({ currentRoute }) => {
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
};

export default MainMenu;
