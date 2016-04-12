import React, { PropTypes } from 'react';

import UserMenu from './UserMenu.jsx';
import MainMenu from './MainMenu.jsx';
import SearchForm from './SearchForm.jsx';
import { Container } from '../common.jsx';

import header from './Header.mss';
import menu from './Menu.mss';

const Header = () => (
  <header className={header.mainHeader}>
    <Container extraClass={menu.container}>
      <MainMenu />
      <div className={menu.container}>
        <SearchForm />
        <UserMenu />
      </div>
    </Container>
  </header>
);

Header.propTypes = {
  currentUser: PropTypes.object,
};

export default Header;
