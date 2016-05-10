import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import UserMenu from './UserMenu.jsx';
import MainMenu from './MainMenu.jsx';
import SearchForm from './SearchForm.jsx';
import { Container } from '../common.jsx';

import header from './Header.mss';
import menu from './Menu.mss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isAtTop: true };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({ isAtTop: window.scrollY === 0 });
  }

  render() {
    const { currentRoute } = this.props;
    const scrollClass = this.state.isAtTop ? header.top : header.detached;
    return (
      <header className={`${header.mainHeader} ${scrollClass}`}>
        <Container extraClass={menu.container}>
          <MainMenu currentRoute={currentRoute} />
          <div className={menu.container}>
            <SearchForm />
            <UserMenu currentRoute={currentRoute} />
          </div>
        </Container>
      </header>
    );
  }
}

Header.propTypes = {
  currentRoute: PropTypes.object.isRequired,
};

export default createContainer(() => {
  FlowRouter.watchPathChange();
  return {
    currentRoute: FlowRouter.current(),
  };
}, Header);
