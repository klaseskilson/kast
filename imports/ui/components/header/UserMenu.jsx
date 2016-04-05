import React, { PropTypes } from 'react';

const UserMenu = () => (
  <div>
    { this.props.user.name }
  </div>
);

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserMenu;
