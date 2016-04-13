import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { urlEncode } from '/imports/helpers/urlHelpers.js';
import { Spinner, NothingFound } from '/imports/ui/components/common.jsx';
import PodcastBox from '/imports/ui/components/podcasts/PodcastBox.jsx';
import ItunesSearchCache from '/imports/api/ItunesSearchCache/methods.js';

import styles from './ItunesSearch.mss';

class ItunesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], loading: true };
    this.searchItunes = this.searchItunes.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.resultList = this.resultList.bind(this);
  }

  searchItunes(searchString) {
    ItunesSearchCache.methods.search.call(searchString, this.handleSearchResult);
  }

  handleSearchResult(error, results) {
    if (error) {
      // snap!
    } else {
      this.setState({ loading: false, searchResult: results.results });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ loading: true });
    this.searchItunes(newProps.search);
  }

  componentDidMount() {
    this.searchItunes(this.props.search);
  }

  resultList() {
    const { searchResult } = this.state;

    // calculate if we should fill the search result with dummy content (ugly and hacky)
    let rest = searchResult.length % 4;
    const dummies = [];
    while (rest--) {
      dummies.push((<article> </article>));
    }

    // return list of found podcasts or the NothingFound-component
    return searchResult.length === 0 ? (<NothingFound />) : (
      <div className={styles.searchResults}>
        { searchResult.map(podcast => (
          <PodcastBox podcast={podcast} key={podcast.collectionId} />
        )) }
        { dummies }
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <h2>iTunes podcasts search</h2>
        {
          this.state.loading ?
            (<Spinner loading={loading} icon="" />) :
            this.resultList()
        }
      </div>
    );
  }
}

ItunesSearch.propTypes = {
  search: PropTypes.string.isRequired,
};

export default ItunesSearch;
