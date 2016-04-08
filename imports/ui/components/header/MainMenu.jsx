import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';

const menuItems = [
  {
    route: 'home',
    title: 'Home',
  },
];

const MainMenu = ({ currentRoute }) => {
  const currentRouteName = currentRoute.route.name;
  return (
    <nav className="main-menu">
      {
        menuItems.map(({ title, route }) => {
          const path = FlowRouter.path(route);
          const className = `nav--entry ${currentRouteName === route ? 'nav--entry--active' : ''}`;
          return (
            <a href={path} className={className}>{title}</a>
          );
        })
      }
    </nav>
  );
};

MainMenu.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

export default createContainer(() => {
  FlowRouter.watchPathChange();
  return {
    currentRoute: FlowRouter.current(),
  };
}, MainMenu);
