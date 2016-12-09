import React from "react";
import {Table, Button, Popconfirm} from "antd";

import {convertToTree, sortTree} from '../../utils/converter';

const MenuList = ({onAdd, onDelete, onEdit, menuList}) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width:'20%'
    }, {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width:'20%'
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width:'20%'
    }, {
      title: '排序号',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width:'10%'
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width:'10%'
    }, {
      title: '操作',
      key: 'id',
      width:'20%',
      render: (text, record) =>
        <Button.Group>
          <Button size="small" type="primary" onClick={() => onEdit(record)}>编辑</Button>
          <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
        </Button.Group>
    }];


  //为树形 table 添加 key 的字段 ,并把线性结构转为树形结构
  const treeList = sortTree(convertToTree(menuList.map(n => Object.assign({key: n.id}, n))).filter((n) => {
    return !n.pid;
  }));

  return (
    <div>
      <Table
        dataSource={treeList}
        columns={columns}
        defaultExpandAllRows
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

MenuList.propTypes = {};
MenuList.defaultProps = {};

export default MenuList;
