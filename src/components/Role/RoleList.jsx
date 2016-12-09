import React from "react";
import {Table, Button, Popconfirm} from "antd";

const RoleList = ({onAdd, onDelete, onEdit, roleList, onEditRoleMenu}) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '操作',
      key: 'id',
      width: '400px',
      render: (text, record) =>
        <Button.Group>
          <Button size="small" type="primary" onClick={() => onEdit(record)}>编辑</Button>
          <Button size="small" onClick={() => onEditRoleMenu(record)}>设置菜单</Button>
          <Button size="small">设置权限</Button>
          <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
        </Button.Group>
    }];

  return (
    <div>
      <Table
        dataSource={roleList}
        columns={columns}
        title={() =>
          (
            <div >
              <Button type="primary" onClick={() => onAdd()}>新增</Button>
            </div>
          )}
      />
    </div>
  );
};

RoleList.propTypes = {};
RoleList.defaultProps = {};

export default RoleList;
