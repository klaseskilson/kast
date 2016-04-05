import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.signIn = this.signIn.bind(this);
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

    Meteor.loginWithPassword(username, password, error => {
      if (error) {
        this.setState({
          message: error.reason,
        });
      } else {
        FlowRouter.go('home');
      }
    });
  }

  render() {
    const buttonText = this.props.loggingIn ? 'signing in...' : 'sign in';
    return (
      <form onSubmit={this.signIn}>
        {this.state.message ? (<p>{this.state.message}</p>) : ''}
        <input type="text" ref="username" placeholder="Username..." />
        <input type="password" ref="password" placeholder="Password..." />
        <button>
          { buttonText }
        </button>
      </form>
    );
  }
}

SignInForm.propTypes = {
  loggingIn: PropTypes.bool,
};

export default SignInForm;
