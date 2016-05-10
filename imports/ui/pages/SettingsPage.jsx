import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/stevezhu:lodash';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base'

import { Spinner, FadeInLoader, Container } from '../components/common.jsx';
import { updateUser, setUsername } from '../../api/users/methods.js';

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user, loading: false, message: '', savingPassword: false };
    this.handleChange = this.handleChange.bind(this);
    this.startUpdate = this.startUpdate.bind(this);
    this.finishedUpdate = this.finishedUpdate.bind(this);
    this.handleUsername = this.handleUsername.bind(this);

    this.update = _.debounce((method, params) => {
      this.startUpdate();
      method.call(params, this.finishedUpdate);
    }, 1000);
  }

  componentWillReceiveProps({ user }) {
    this.setState({ user });
  }

  handleChange(event) {
    const user = this.state.user;
    const { name, value } = event.target;

    // use Lodash's update to update object by using a `nested.key.like.this`
    _.update(user, name, () => value);
    this.setState({ user });

    // avoid clogging server with method calls, update only once
    this.update(updateUser, { key: name, value });
  }

  handleUsername(event) {
    const user = this.state.user;
    const { value } = event.target;

    // update state so that change feels instant
    user.username = value;
    this.setState({ user });

    // make debounced call to not be clogging server with calls
    this.update(setUsername, value);
  }

  startUpdate() {
    this.setState({
      message: '',
      loading: true,
    });
  }

  finishedUpdate(error) {
    this.setState({
      message: error && error.reason || 'All changes saved!',
      loading: false,
    });
  }

  render() {
    const { user, loading, message } = this.state;

    const profileName = user && user.profile && user.profile.name || '';
    return (
      <FadeInLoader loading={!user}>
        <Container>
          <h1>
            <Spinner loading={loading} icon="user" /> Settings
          </h1>
          {message ? (<p>{message}</p>) : ''}
          <div className="row">
            <div className="col-3">
              <h2>Profile</h2>
              {user ? (
                <form onSubmit={event => event.preventDefault()}>
                  <div className="input-group">
                    <label htmlFor="profileName">Your name</label>
                    <input
                      value={profileName}
                      name="profile.name"
                      id="profileName"
                      placeholder="Your name..."
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      value={user.username || ''}
                      placeholder="Username..."
                      onChange={this.handleUsername}
                    />
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </Container>
      </FadeInLoader>
    );
  }
}

SettingsPage.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  const user = Meteor.user();
  return {
    user,
  };
}, SettingsPage);
