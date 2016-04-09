import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.signIn = this.signIn.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  /**
   * Callback to use on callback attempt
   * @param {Error} error
   */
  loginCallback(error) {
    if (error) {
      this.setState({
        message: error.reason || error.message,
      });
    } else {
      FlowRouter.go('home');
    }
  }

  /**
   * send a meteor sign in request
   * @param event
   */
  signIn(event) {
    event.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    if (!username || !password) return;

    Meteor.loginWithPassword(username, password, this.loginCallback);
  }

  signInWithFacebook() {
    Meteor.loginWithFacebook({
      requestPermissions: [
        'public_profile',
        'user_friends',
        'email',
      ],
    }, this.loginCallback);
  }

  signInWithGoogle() {
    Meteor.loginWithGoogle({
      requestPermissions: [
        'email',
        'profile',
      ],
    }, this.loginCallback);
  }

  render() {
    const buttonText = this.props.loggingIn ? 'signing in...' : 'sign in';
    return (
      <div>
        <form onSubmit={this.signIn}>
          {this.state.message ? (<p>{this.state.message}</p>) : ''}
          <input type="text" ref="username" placeholder="Username..." required />
          <input type="password" ref="password" placeholder="Password..." required />
          <button>
            { buttonText }
          </button>
        </form>
        <div>
          <button onClick={this.signInWithFacebook}>
            Sign in with Facebook
          </button>
          <button onClick={this.signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
        <p>
          <a href={FlowRouter.path('recover')}>Forgotten your password?</a>
          <a href={FlowRouter.path('signUp')}>Sign up</a>
        </p>
      </div>
    );
  }
}

SignInForm.propTypes = {
  loggingIn: PropTypes.bool,
};

export default SignInForm;
