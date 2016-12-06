import React from 'react';
import {Table, Button, Popconfirm} from 'antd';

const DicList = ({ onAdd, onDelete, onEdit, onChangePwd, dataSource }) => {

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
        <Button.Group>
          <Button size="small" onClick={() => onEdit(record)}>编辑</Button>
          <Button type="primary" size="small" onClick={() => onChangePwd(record.id)}>重置密码</Button>
          <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
        </Button.Group>
    }];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      title={() =>
        (
          <div >
            <Button type="primary" onClick={() => onAdd()}>新增</Button>
          </div>
        )}
    />
  );
};

DicList.propTypes = {};
DicList.defaultProps = {};

export default DicList;
