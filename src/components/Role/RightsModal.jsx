/**
 * Created by haojiachen on 2016/12/12.
 */
import React from 'react';
import {Modal, Table} from 'antd';

const RightsModal = ({rightsList, visible, selectedRights = [], onOk, onCancel, onRowChange}) => {
  const modalOpts = {
    maskClosable: false,
    width: 820,
    title: '设置角色权限',
    visible,
    onOk,
    onCancel,
  };

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
    }];

  const rowSelection = {
    selectedRowKeys: selectedRights,
    onChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      onRowChange(selectedRowKeys);
    }
  };

  return (
    <Modal {...modalOpts}>
      <Table
        size={'small'}
        dataSource={rightsList.map(n => Object.assign({key: n.id}, n))}
        columns={columns}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

RightsModal.propTypes = {};
RightsModal.defaultProps = {};

export default RightsModal;
