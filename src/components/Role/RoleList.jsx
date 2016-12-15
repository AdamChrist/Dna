import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import RightsContainer from '../Common/RightsContainer';

const RoleList = ({ onAdd, onDelete, onEdit, roleList, onEditRoleMenu, onEditRoleRights }) => {
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
        <RightsContainer>
          <Button.Group>
            <Button size="small" type="primary" onClick={() => onEdit(record)} data-rightsKey='ROLE/UPDATE'>编辑</Button>
            <Button size="small" onClick={() => onEditRoleMenu(record)} data-rightsKey='ROLE/MENU'>设置菜单</Button>
            <Button size="small" onClick={() => onEditRoleRights(record)} data-rightsKey='ROLE/RIGHTS'>设置权限</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
              <Button type="default" size="small" data-rightsKey='ROLE/DEL'>删除</Button>
            </Popconfirm>
          </Button.Group>
        </RightsContainer>
    }];

  return (
    <div>
      <Table
        dataSource={roleList}
        columns={columns}
        title={() =>
          (
            <div >
              <RightsContainer>
                <Button type="primary" onClick={() => onAdd()} data-rightsKey='ROLE/CREATE'>新增</Button>
              </RightsContainer>
            </div>
          )}
      />
    </div>
  );
};

RoleList.propTypes = {};
RoleList.defaultProps = {};

export default RoleList;
