import React from 'react';
import {Table, Button, Popconfirm, Icon} from 'antd';
import RightsContainer from '../Common/RightsContainer';

const MenuList = ({ onAdd, onDelete, onEdit, menuList }) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: '20%'
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: '20%'
    }, {
      title: '排序号',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: '10%'
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: '10%',
      render: (text, record) => <Icon type={text} />
    }, {
      title: '操作',
      key: 'id',
      width: '20%',
      render: (text, record) =>
        <RightsContainer>
          <Button.Group>
            <Button size="small" type="primary" onClick={() => onEdit(record)} data-rightsKey='MENU/UPDATE'>编辑</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
              <Button type="default" size="small" data-rightsKey='MENU/DEL'>删除</Button>
            </Popconfirm>
          </Button.Group>
        </RightsContainer>
    }];

  return (
    <div>
      <Table
        dataSource={menuList}
        columns={columns}
        defaultExpandAllRows
        title={() =>
          (
            <div >
              <RightsContainer>
                <Button type="primary" onClick={() => onAdd()} data-rightsKey='MENU/CREATE'>新增</Button>
              </RightsContainer>
            </div>
          )}
      />
    </div>
  );
};

MenuList.propTypes = {};
MenuList.defaultProps = {};

export default MenuList;
