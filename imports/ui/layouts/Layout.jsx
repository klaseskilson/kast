import React, { PropTypes } from 'react';

import Header from '../components/header/Header.jsx';

import styles from './Layout.mss';
const { wrapper, mainLayout } = styles;

// define and export our Layout component
const Layout = ({ content }) => (
  <div className={wrapper}>
    <Header />
    <main className={mainLayout}>{content}</main>
  </div>
);

Layout.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Layout;
