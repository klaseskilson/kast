import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Spinner, BigHeader, Container } from '../common.jsx';
import styles from './SignInForm.mss';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
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
    const { loggingIn } = this.props;
    return (
      <div className="div">
        <BigHeader>
          <h1>Sign in</h1>
          <h2>Kast is better with an account!</h2>
        </BigHeader>
        <Container extraClass="narrow">
          <button onClick={this.signInWithFacebook} className={`block ${styles.facebook}`}>
            <Spinner icon="facebook" loading={loggingIn} /> Sign in with Facebook
          </button>
          <button onClick={this.signInWithGoogle} className={`block ${styles.google}`}>
            <Spinner icon="google" loading={loggingIn} /> Sign in with Google
          </button>
        </Container>
      </div>
    );
  }
}

SignInForm.propTypes = {
  loggingIn: PropTypes.bool,
};

export default SignInForm;
