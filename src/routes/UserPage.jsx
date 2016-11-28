import React, {PropTypes} from 'react';

import {UserList} from '../components/User';

const UserPage = ({ user, dispatch }) => {

  const userListProps = {};

  return (
    <div>
      <UserList {...userListProps} />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
