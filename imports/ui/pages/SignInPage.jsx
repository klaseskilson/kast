import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import SignInForm from '/imports/ui/components/user/SignInForm.jsx';

// define and export our Sign in page
class SignInPage extends Component {
  render() {
    return (
      <div>
        <SignInForm loggingIn={this.props.loggingIn} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  loggingIn: PropTypes.bool,
};

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  return {
    loggingIn,
  };
}, SignInPage);
