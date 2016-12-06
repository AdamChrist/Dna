import React, {PropTypes} from 'react';
import {Input} from 'antd';
import AdvancedSearchForm from '../../components/Common/AdvancedSearchForm';
import {UserList, UserModal} from '../../components/User';

const UserPage = ({user, dispatch}) => {
  const {userList, visible, isAdd, item} = user;
  //用户列表属性
  const userListProps = {
    dataSource: userList,
    onDelete(id) {
      dispatch({
        type: 'user/del',
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
          isAdd: true,
          item: {}
        }
      });
    }
  };
  //用户搜索属性
  const userSearchProps = {
    user,
    onSearch(values){
      dispatch({
        type: 'user/query',
        payload: values
      });
    },
    formItems: [
      {label: '姓名', fieldName: 'name.$like', render: <Input placeholder="用户姓名"/>},
      {label: '账号', fieldName: 'account.$like', render: <Input placeholder="用户账号"/>},
      {label: '手机号', fieldName: 'mobile.$like', render: <Input placeholder="用户手机号"/>},
    ]
  };

  //用户modal的属性
  const userModalProps = {
    item,
    isAdd,
    visible,
    onOk(data) {
      dispatch({
        type: 'user/save',
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
      <AdvancedSearchForm {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
