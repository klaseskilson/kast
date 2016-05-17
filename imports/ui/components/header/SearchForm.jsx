import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/stevezhu:lodash';

import { urlEncode, urlDecode } from '../../../helpers/urlHelpers.js';
import styles from './SearchForm.mss';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    const search = props.search && urlDecode(props.search) || '';
    this.state = { search };
    this.onType = this.onType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.debouncedSearch = _.debounce(searchString => this.search(searchString), 1500);
  }

  onType(event) {
    this.setState({
      search: event.target.value,
    });
    this.debouncedSearch(event.target.value);
  }

  onSubmit(event) {
    // prevent form submission and debounced function call
    event.preventDefault();
    this.debouncedSearch.cancel();
    const search = ReactDOM.findDOMNode(this.refs.search).value.trim();
    this.search(search);
  }

  search(searchString) {
    const search = urlEncode(searchString);
    if (search !== '') {
      FlowRouter.go('search', { search });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Search..."
          ref="search"
          value={this.state.search}
          onChange={this.onType}
          className={styles.textField}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.string,
};

export default createContainer(() => {
  FlowRouter.watchPathChange();
  const { search } = FlowRouter.current().params;
  return {
    search,
  };
}, SearchForm);
