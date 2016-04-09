import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Spinner } from '../common.jsx';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '', loading: false, };
    this.signUp = this.signUp.bind(this);
  }

  /**
   * send a meteor sign in request
   * @param event
   */
  signUp(event) {
    event.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    if (!username || !password || !email) return;

    this.setState({
      loading: true,
    });

    Accounts.createUser({ username, password, email }, error => {
      if (error) {
        this.setState({
          message: error.reason,
          loading: false,
        });
      } else {
        Meteor.loginWithPassword(username, password, () => {
          FlowRouter.go('home');
        });
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.signUp}>
        {this.state.message ? (<p>{this.state.message}</p>) : ''}
        <input type="email" ref="email" placeholder="Email..." required />
        <input type="text" ref="username" placeholder="Username..." required />
        <input type="password" ref="password" placeholder="Password..." required />
        <button>
          <Spinner loading={this.state.loading} icon="check-circle" />
          Sign up
        </button>
      </form>
    );
  }
}

export default SignUpForm;
