/**
 * Created by haojiachen on 2016/12/12.
 */
import React from "react";
import {Table, Button, Popconfirm} from "antd";

const RightsList = ({onAdd, onDelete, onEdit, rightsList}) => {
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
    }, {
      title: '操作',
      key: 'id',
      width: '400px',
      render: (text, record) =>
        <Button.Group>
          <Button size="small" type="primary" onClick={() => onEdit(record)}>编辑</Button>
          <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => onDelete(record.id)}>
            <Button type="default" size="small">删除</Button>
          </Popconfirm>
        </Button.Group>
    }];

  return (
    <div>
      <Table
        dataSource={rightsList}
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

RightsList.propTypes = {};
RightsList.defaultProps = {};

export default RightsList;
