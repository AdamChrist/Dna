import React, {PropTypes} from 'react';

import {UserList, UserSearch} from '../components/User';

const UserPage = ({ user, dispatch }) => {

  console.log(user);

  const userListProps = {
    dataSource: user.userList,
    onDelete(id) {
      dispatch({
        type: 'users/del',
        payload: id
      });
    },
    onEdit(formData) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          formData
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  const userSearchProps = {
    onSearch(values){
      dispatch({
        type: 'user/query',
        payload: values
      });
    }
  };

  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
