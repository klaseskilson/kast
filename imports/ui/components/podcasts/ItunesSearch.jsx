import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { urlEncode } from '/imports/helpers/urlHelpers.js';
import { Spinner } from '/imports/ui/components/common.jsx';
import PodcastBox from '/imports/ui/components/podcasts/PodcastBox.jsx';
import ItunesSearchCache from '/imports/api/ItunesSearchCache/methods.js';

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
      console.log(results);
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
    //return (<span>{searchResult.length} results!</span>);
    return (
      <div>
        lol
        { searchResult.map(podcast => (<PodcastBox podcast={podcast} key={podcast.collectionId} />)) }
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return this.state.loading ?
      (<Spinner loading={loading} icon="" />) :
      this.resultList();
  }
}

ItunesSearch.propTypes = {
  search: PropTypes.string.isRequired,
};

export default ItunesSearch;
