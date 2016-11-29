import React, {Component} from 'react';
import {Table, Button, Popconfirm}from 'antd';

class UserList extends Component {
  render() {


    const dataSource = [{
      name: '胡彦斌',
      account: 'huyanbin',
      mobile: '13900000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }, {
      name: '胡彦祖',
      account: 'wuyanzu',
      mobile: '13800000000'
    }
    ];

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
          < Button.Group>
            <Button size="small">编辑</Button>
            <Button type="primary" size="small">重置密码</Button>
            <Popconfirm placement="top" title={'确认删除?'} onConfirm={() => dispatch({ type: 'user/del', payload: record.id }) }>
              <Button type="default" size="small">删除</Button>
            </Popconfirm>
          </ Button.Group>
      }];

    return (
      <Table dataSource={dataSource} columns={columns} />
    );
  }
}

UserList.propTypes = {};
UserList.defaultProps = {};

export default UserList;
