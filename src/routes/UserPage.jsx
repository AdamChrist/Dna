import React, {PropTypes} from 'react';

import {UserList, UserSearch} from '../components/User';

const UserPage = ({ user, dispatch }) => {

  const userListProps = {};

  return (
    <div>
      <UserSearch />
      <UserList {...userListProps} />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
