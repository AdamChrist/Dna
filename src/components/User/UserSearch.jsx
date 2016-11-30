import React from 'react';
import {Form, Input} from 'antd';
import AdvancedSearchForm from '../Common/AdvancedSearchForm';

const UserSearch = ({ onSearch }) => {

  const searchFormProps = {
    formItems: [
      { label: '姓名', fieldName: 'name.$like', render: <Input placeholder="请输入用户姓名" /> },
      { label: '手机号', fieldName: 'mobile.$like', render: <Input placeholder="请输入用户手机号" /> },
      { label: '账号', fieldName: 'account.$like', render: <Input placeholder="请输入用户账号" /> },
    ],
    onSearch
  };

  return (
    <AdvancedSearchForm {...searchFormProps} />
  );
};

UserSearch.propTypes = {};
UserSearch.defaultProps = {};

export default Form.create()(UserSearch);
