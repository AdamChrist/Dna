import React from 'react';
import {Table, Button, Popconfirm, Card} from 'antd';

import {convertToTree} from '../../utils/converter';

const DicList = ({ onAdd, onDelete, onEdit, dicMxList }) => {

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: '40%',
    }, {
      title: '操作',
      key: 'id',
      width: '20%',
      render: (text, record) =>
        <Button.Group>
          <Button size="small" type="primary" onClick={() => onEdit(record)}>编辑</Button>
          <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
        </Button.Group>
    }];

  const treeList = convertToTree(dicMxList.map(n => Object.assign({ key: n.id }, n))).filter((n) => {
    return !n.pid;
  });

  return (
    <Card title="数据字典">
      <Table
        dataSource={treeList}
        columns={columns}
        title={() =>
          (
            <div >
              <Button type="primary" onClick={() => onAdd()}>新增</Button>
              <Button onClick={() => onAdd()}>批量删除</Button>
            </div>
          )}
      />
    </Card>
  );
};

DicList.propTypes = {};
DicList.defaultProps = {};

export default DicList;
