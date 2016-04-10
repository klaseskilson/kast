import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';
import { createContainer } from 'meteor/react-meteor-data';

import { Spinner } from '../components/common.jsx';
import { updateUser } from '../../api/users/methods.js';

const debouncedUpdate = _.debounce((params, onStart, onFinished) => {
  onStart();
  updateUser.call(params, onFinished);
}, 1000);

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user, loading: false, message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.finishedUpdate = this.finishedUpdate.bind(this);
  }

  handleChange(event) {
    const user = this.state.user;
    const { name, value } = event.target;

    // use Lodash's update to update object by using a `nested.key.like.this`
    _.update(user, name, () => value);
    this.setState({
      user,
    });

    // avoid clogging server with method calls, update only once
    debouncedUpdate({
      key: name,
      value,
    }, this.startUpdate, this.finishedUpdate);
  }

  startUpdate() {
    this.setState({
      message: '',
      loading: true,
    });
  }

  finishedUpdate(error) {
    if (error) {
      this.setState({
        message: error.message,
        loading: false,
      });
    } else {
      this.setState({
        message: 'All changes saved!',
        loading: false,
      });
    }
  }

  render() {
    const { user, loading, message } = this.state;
    return (
      <div>
        <h1>
          <Spinner loading={loading} icon="user" /> Settings
        </h1>
        { message ? (<p>{message}</p>) : ''}
        { user ? (
          <form onSubmit={event => event.preventDefault()}>
            <input value={user.profile.name}
              ref="profile.name"
              name="profile.name"
              placeholder="Your name..."
              onChange={this.handleChange}
            />
          </form>
        ) : 'loading...'}
        {JSON.stringify(user)}
      </div>
    );
  }
}

SettingsPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default createContainer(() => ({
  user: Meteor.user(),
}), SettingsPage);
