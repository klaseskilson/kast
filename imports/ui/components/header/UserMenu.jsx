import React, { PropTypes } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

const UserMenu = ({ user }) => (
  <nav className="usermenu">
    { user.username }
    <a href={FlowRouter.path('signOut')}>Sign out</a>
  </nav>
);

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserMenu;
