import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Container } from '../components/common.jsx';
import ItunesSearch from '../components/podcasts/ItunesSearch.jsx';

const SearchPage = ({ searchString }) => (
  <Container>
    <h1>Searching for <em>{searchString}</em></h1>
    <h2>Your library</h2>
    <h2>iTunes podcasts search</h2>
    <ItunesSearch search={searchString} />
  </Container>
);

SearchPage.propTypes = {
  searchString: PropTypes.string,
};

export default SearchPage;
