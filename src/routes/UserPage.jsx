import React, {PropTypes} from 'react';

import {UserList, UserSearch, UserModal} from '../components/User';

const UserPage = ({ user, dispatch }) => {
  const { userList, visible, isAdd, item } = user;
  //用户列表属性
  const userListProps = {
    dataSource: userList,
    onDelete(id) {
      dispatch({
        type: 'users/del',
        payload: id
      });
    },
    onEdit(data) {
      dispatch({
        type: 'user/showModal',
        payload: {
          isAdd: false,
          item: data
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'user/showModal',
        payload: {
          isAdd: true
        }
      });
    }
  };
  //用户搜索属性
  const userSearchProps = {
    onSearch(values){
      dispatch({
        type: 'user/query',
        payload: values
      });
    }
  };

  //用户modal的属性
  const userModalProps = {
    item,
    isAdd,
    visible,
    onOk(data) {
      dispatch({
        type: `user/save`,
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal'
      });
    },
  };

  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen {...userModalProps} />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
