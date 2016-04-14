import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

const Library = ({ user, search }) => (user ? (
  <div>
    <h2>Your library</h2>
    <span>{user.username} searching for {search}</span>
  </div>
) : null);

Library.propTypes = {
  search: PropTypes.string,
  user: PropTypes.object,
};

export default createContainer(({ search }) => {
  const user = Meteor.user();
  return {
    search,
    user,
  };
}, Library);
