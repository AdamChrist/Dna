/**
 * Created by haojiachen on 2016/12/9.
 */
import React from "react";
import {Modal, Table} from "antd";
import {convertToTree, sortTree} from "../../utils/converter";

const MenuModal = ({menuList, visible, selectedMenus = [], onOk, onCancel, onRowChange}) => {

  const modalOpts = {
    maskClosable: false,
    width: 820,
    title: '设置角色菜单权限',
    visible,
    onOk,
    onCancel,
  };

  const getChildrenKeys = (record, keys) => {
    const children = record.children;
    if (children && children.length > 0) {
      children.forEach(n => {
        keys.push(n.id);
        getChildrenKeys(n, keys)
      });
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedMenus,
    onChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);

      // onRowChange(selectedRowKeys);
    },
    onSelect(record, selected, selectedRows){
      //父子数据递归关联选择。
      console.log(record, selected, selectedRows);
      //已选中的ID
      let selectedRowKeys = [];
      //选中操作:选中当前节点的父节点,选中当前节点的子节点
      if (selected) {
        selectedRowKeys = selectedRows.map(n => n.id);
        //选中当前节点的子节点
        getChildrenKeys(record, selectedRowKeys);
        //选中当前节点的父节点(ps:未做递归)
        if (record.pid)
          selectedRowKeys.push(record.pid);
      }
      //取消操作:取消当前节点的子节点,如果当前节点的父节点没有被选中的,则取消父节点
      else {
        //取消当前节点的子节点
        let filterRows = selectedRows.filter(n => n.pid !== record.id);
        if (!filterRows.some(m => m.pid === record.pid)) {
          selectedRowKeys = filterRows.filter(n => n.id !== record.pid).map(n => n.id);
        } else {
          selectedRowKeys = filterRows.map(n => n.id);
        }
      }
      onRowChange(selectedRowKeys);
    }
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%'
    }, {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: '20%'
    }, {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: '30%'
    }, {
      title: '排序号',
      dataIndex: 'sortNo',
      key: 'sortNo',
      width: '10%'
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: '10%'
    }];

  //为树形 table 添加 key 的字段 ,并把线性结构转为树形结构
  const treeList = sortTree(convertToTree(menuList.map(n => Object.assign({key: n.id}, n))).filter((n) => {
    return !n.pid;
  }));

  return (
    <Modal {...modalOpts}>
      <Table
        size={'small'}
        dataSource={treeList}
        columns={columns}
        defaultExpandAllRows
        rowSelection={rowSelection}
        pagination={false}
      />
    </Modal>
  );
};

MenuModal.propTypes = {};
MenuModal.defaultProps = {};

export default MenuModal;
