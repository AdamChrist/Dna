import React, {PropTypes} from 'react';
import {Input} from 'antd';
import AdvancedSearchForm from '../../components/Common/AdvancedSearchForm';
import {UserList, UserModal, ResetPwdModal} from '../../components/User';

const UserPage = ({ user, role, dispatch }) => {
  const { userList, visible, item, pwdVisible } = user;
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
          item: data
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'user/showModal',
        payload: {
          item: {}
        }
      });
    },
    onChangePwd(data){
      dispatch({
        type: 'user/showPwdModal',
        payload: {
          item: data
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
      { label: '姓名', fieldName: 'name.$like', render: <Input placeholder="用户姓名" /> },
      { label: '账号', fieldName: 'account.$like', render: <Input placeholder="用户账号" /> },
      { label: '手机号', fieldName: 'mobile.$like', render: <Input placeholder="用户手机号" /> },
    ]
  };

  //用户modal的属性
  const userModalProps = {
    roleList: role.roleList,
    item,
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

  const pwdModalProps = {
    item,
    pwdVisible,
    onOk(data) {
      dispatch({ type: 'user/hidePwdModal' });
      dispatch({ type: 'user/save', payload: data });
    },
    onCancel() {
      dispatch({
        type: 'user/hidePwdModal'
      });
    },
  };

  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  const UserModalGen = () =>
    <UserModal {...userModalProps} />;
  const PwdModalGen = () =>
    <ResetPwdModal {...pwdModalProps} />;

  return (
    <div>
      <AdvancedSearchForm {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
      <PwdModalGen />
    </div>
  );
};

UserPage.propTypes = {
  dispatch: PropTypes.func
};

export default UserPage;
