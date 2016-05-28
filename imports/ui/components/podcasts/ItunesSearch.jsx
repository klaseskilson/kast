import React, { Component, PropTypes } from 'react';

import { Spinner, NothingFound } from '../common.jsx';
import PodcastBox from '../podcasts/PodcastBox.jsx';
import PodcastList from '../podcasts/PodcastList.jsx';
import ItunesSearchCache from '../../../api/SearchCache/methods.js';

import styles from './PodcastList.mss';

class ItunesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], loading: true };
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.searchItunes = this.searchItunes.bind(this);
    this.resultList = this.resultList.bind(this);
  }

  componentDidMount() {
    this.searchItunes(this.props.search);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ loading: true });
    this.searchItunes(newProps.search);
  }

  handleSearchResult(error, results) {
    if (error) {
      // snap!
    } else {
      this.setState({ loading: false, searchResult: results.results });
    }
  }

  searchItunes(searchString) {
    ItunesSearchCache.methods.search.call(searchString, this.handleSearchResult);
  }

  resultList() {
    const { searchResult } = this.state;

    // calculate if we should fill the search result with dummy content (ugly and hacky)
    let rest = searchResult.length % 4;
    const dummies = [];
    while (rest--) {
      dummies.push((<article key={`dummy-${rest}`}> </article>));
    }

    // return list of found podcasts or the NothingFound-component
    return searchResult.length === 0 ? (<NothingFound />) : (
      <div className={styles.searchResults}>
        {searchResult.map(podcast => (
          <PodcastBox podcast={podcast} key={podcast.collectionId} />
        ))}
        {dummies}
      </div>
    );
  }

  render() {
    const { loading, searchResult } = this.state;

    return (
      <div>
        <h2>iTunes podcasts search</h2>
        {
          this.state.loading ?
            (<Spinner loading={loading} icon="" />) :
            <PodcastList podcasts={searchResult || []} />
        }
      </div>
    );
  }
}

ItunesSearch.propTypes = {
  search: PropTypes.string.isRequired,
};

export default ItunesSearch;
