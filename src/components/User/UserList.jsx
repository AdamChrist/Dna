import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import RightsContainer from '../Common/RightsContainer';


const UserList = ({ onAdd, onDelete, onEdit, onChangePwd, dataSource }) => {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account'
    }, {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 200
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200
    }, {
      title: '操作',
      key: 'id',
      width: 200,
      render: (text, record) =>
        <RightsContainer>
          <Button.Group>
            <Button size="small" onClick={() => onEdit(record)} data-rightsKey='USER/EDIT'>编辑</Button>
            <Button type="primary" size="small" onClick={() => onChangePwd(record)} data-rightsKey='USER/PWD'>重置密码</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
              <Button type="default" size="small" data-rightsKey='USER/DEL'>删除</Button>
            </Popconfirm>
          </Button.Group>
        </RightsContainer>
    }];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        title={() =>
          (
            <div >
              <RightsContainer>
                <Button type="primary" onClick={() => onAdd()} data-rightsKey='USER/ADD'>新增</Button>
              </RightsContainer>
            </div>
          )}
      />
    </div>
  );
}

UserList.propTypes = {};
UserList.defaultProps = {};

export default UserList;
