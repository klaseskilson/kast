import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const SearchPage = ({ searchString }) => (
  <h1>{searchString}</h1>
);

SearchPage.propTypes = {
  searchString: PropTypes.string,
};

export default SearchPage;
