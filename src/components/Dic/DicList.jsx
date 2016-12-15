import React from 'react';
import {Table, Button, Popconfirm, Card, notification} from 'antd';
import RightsContainer from '../Common/RightsContainer';
import {convertToTree} from '../../utils/converter';

const DicList = ({ onAdd, onDelete, onEdit, dicMxList, dicSelectKey }) => {

  const handleDel = (id) => {
    const children = dicMxList.filter(n => {
      return n.pid == id
    });
    if (children.length > 0) {
      notification.error({
        message: '错误',
        description: '存在子节点,请先删除子节点!',
      });
      return;
    }
    onDelete(id);
  };

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
        <RightsContainer>
          <Button.Group>
            <Button size="small" type="primary" onClick={() => onEdit(record)} data-rightsKey='DICMX/UPDATE'>编辑</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => handleDel(record.id)}>
              <Button type="default" size="small" data-rightsKey='DICMX/DEL'>删除</Button>
            </Popconfirm>
          </Button.Group>
        </RightsContainer>
    }];

  //按钮是否可以用
  const disabled = dicSelectKey === '';
  //为树形 table 添加 key 的字段 ,并把线性结构转为树形结构
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
              <RightsContainer>
                <Button type="primary" disabled={disabled} onClick={() => onAdd()} data-rightsKey='DICMX/CREATE'>新增</Button>
              </RightsContainer>
            </div>
          )}
      />
    </Card>
  );
};

DicList.propTypes = {};
DicList.defaultProps = {};

export default DicList;
