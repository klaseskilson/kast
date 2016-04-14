import React, { PropTypes } from 'react';

import { Container } from '../components/common.jsx';
import ItunesSearch from '../components/podcasts/ItunesSearch.jsx';
import Library from '../components/podcasts/Library.jsx';

const SearchPage = ({ searchString }) => (
  <Container>
    <h1>Searching for <em>{searchString}</em></h1>
    <Library search={searchString} />
    <ItunesSearch search={searchString} />
  </Container>
);

SearchPage.propTypes = {
  searchString: PropTypes.string,
};

export default SearchPage;
