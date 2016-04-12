import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { _ } from 'meteor/stevezhu:lodash';

import styles from './SearchForm.mss';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { search: props.search || '' };
    this.onType = this.onType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.debouncedSearch = _.debounce(search => this.search(search), 1000);
  }

  onType(event) {
    this.debouncedSearch(event.target.value);
  }

  onSubmit(event) {
    event.preventDefault();
    this.debouncedSearch.cancel();
    const search = ReactDOM.findDOMNode(this.refs.search).value.trim();
    this.search(search);
  }

  search(search) {
    console.log(search);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={styles.form}>
        <input type="text" placeholder="Search..." ref="search"
          onChange={this.onType} className={styles.textField}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.string,
};

export default SearchForm;
