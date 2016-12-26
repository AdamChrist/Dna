/**
 * Created by haojiachen on 2016/12/12.
 */
import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import RightsContainer from '../Common/RightsContainer';

const RightsList = ({ onAdd, onDelete, onEdit, rightsList }) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '请求类型',
      dataIndex: 'method',
      key: 'method',
      filters: [{ text: 'POST', value: 'post' }, { text: 'GET', value: 'get' }, { text: 'PUT', value: 'put' }, { text: 'DELETE', value: 'delete' }],
      onFilter: (value, record) => record.method.indexOf(value) === 0,
      render: (text) => text.toString().toUpperCase()
    }, {
      title: '样式',
      dataIndex: 'type',
      key: 'type',
      filters: [{ text: '禁用', value: 'disabled' }, { text: '隐藏', value: 'hide' }],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (text) => text === 'hide' ? '隐藏' : '禁用'
    }, {
      title: '操作',
      key: 'id',
      render: (text, record) =>
        <RightsContainer>
          <Button.Group>
            <Button size="small" type="primary" onClick={() => onEdit(record)} data-rightsKey='RIGHTS/UPDATE'>编辑</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
              <Button type="default" size="small" data-rightsKey='RIGHTS/DEL'>删除</Button>
            </Popconfirm>
          </Button.Group>
        </RightsContainer>
    }];

  return (
    <div>
      <Table
        dataSource={rightsList}
        columns={columns}
        title={() =>
          (
            <div >
              <RightsContainer>
                <Button type="primary" onClick={() => onAdd()} data-rightsKey='RIGHTS/CREATE'>新增</Button>
              </RightsContainer>
            </div>
          )}
      />
    </div>
  );
};

RightsList.propTypes = {};
RightsList.defaultProps = {};

export default RightsList;
