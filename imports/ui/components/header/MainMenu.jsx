import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

import { routeMap } from './routeWatcher.jsx';
import styles from './Menu.mss';

const menuItems = [
  {
    route: 'home',
    title: 'Home',
  },
];

const MainMenu = ({ currentRoute }) => {
  const routeName = currentRoute.route.name;
  return (
    <nav className={styles.common}>
      { menuItems.map(routeMap.bind(this, routeName, styles)) }
    </nav>
  );
};

MainMenu.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

export default MainMenu;
