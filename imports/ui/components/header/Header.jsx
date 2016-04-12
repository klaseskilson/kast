import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import UserMenu from './UserMenu.jsx';
import MainMenu from './MainMenu.jsx';
import SearchForm from './SearchForm.jsx';
import { Container } from '../common.jsx';

import header from './Header.mss';
import menu from './Menu.mss';

const Header = ({ currentRoute }) => (
  <header className={header.mainHeader}>
    <Container extraClass={menu.container}>
      <MainMenu currentRoute={currentRoute} />
      <div className={menu.container}>
        <SearchForm />
        <UserMenu currentRoute={currentRoute} />
      </div>
    </Container>
  </header>
);

Header.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

export default createContainer(() => {
  FlowRouter.watchPathChange();
  return {
    currentRoute: FlowRouter.current(),
  };
}, Header);
