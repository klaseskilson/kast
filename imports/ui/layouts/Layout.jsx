import React from 'react';

// define and export our Layout component
const Layout = ({ content }) => (
  <div>
    <h1>Kast</h1>
    <hr />
    <div>{content}</div>
  </div>
);

Layout.propTypes = {
  content: React.PropTypes.object.isRequired,
};

export default Layout;
