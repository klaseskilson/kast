import React, { PropTypes } from 'react';
import Header from '/imports/ui/components/header/Header.jsx';

// define and export our Layout component
const Layout = ({ content }) => (
  <div>
    <Header />
    <h1>Kast</h1>
    <hr />
    <div>{content}</div>
  </div>
);

Layout.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Layout;
