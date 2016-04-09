import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import SignUpForm from '/imports/ui/components/user/SignUpForm.jsx';

// define and export our Sign in page
const SignUpPage = () => (
  <div>
    <SignUpForm />
    <a href={FlowRouter.path('signIn')}>Sign in</a>
  </div>
);

export default SignUpPage;
