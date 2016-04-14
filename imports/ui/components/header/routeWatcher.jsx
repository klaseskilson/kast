import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const routeMap = (routeName, styles, { title, route }) => {
  const path = FlowRouter.path(route);
  const className = `nav--entry ${routeName === route ? styles['nav-item--active'] : ''}`;
  return (<a href={path} className={className} key={path}>{title}</a>);
};
