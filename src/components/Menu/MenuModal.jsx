import React from 'react';
import {Form, Input, Modal, InputNumber, TreeSelect, Tree} from 'antd';
import {isMenuExists} from '../../services/menu';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14}};

const MenuModal = ({menuList, form, visible, item = {}, onOk, onCancel}) => {
  const {getFieldDecorator, validateFields, getFieldsValue,} = form;

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {...item, ...getFieldsValue()};
      onOk(data);
    });
  };

  const modalOpts = {
    maskClosable: false,
    title: `${!item.id ? '新增' : '修改'}菜单`,
    visible,
    onOk: handleOk,
    onCancel,
  };

  /**
   * 校验唯一
   * @param rule
   * @param value
   * @param callback
   * @param source
   */
  const checkMenuCode = (rule, value, callback, source) => {
    if (!value || value === item.code) {
      callback();
    } else {
      if (item.id) {
        source.id = item.id;
      }
      //校验唯一
      isMenuExists(source).then(result => {
        result ? callback([new Error('抱歉，该名称已存在!')]) : callback();
      }).catch((error) => {
        error.showError && error.showError();
      });
    }
  };

  const loop = (data, parentId) => data.map((n) => {
    const disable = n.id == item.id;
    if (n.children && n.children.length > 0) {
      return (
        <TreeNode value={n.id} key={n.id} title={n.name} disabled={disable}>
          {loop(n.children, n.id)}
        </TreeNode>
      );
    }
    return <TreeNode value={n.id} key={n.id} title={n.name} disabled={disable}/>;
  });

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="名称：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {required: true, message: '名称未填写'}
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="编码：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {required: true, message: '编码未填写'},
              {validator: checkMenuCode}
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="URL：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('url', {
            initialValue: item.url,
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="排序号：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('sortNo', {
            initialValue: item.sortNo || 0,
          })(
            <InputNumber min={0}/>
          )}
        </FormItem>
        <FormItem label="图标：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('icon', {
            initialValue: item.icon,
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="父节点：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('pid', {
            initialValue: item.pid,
          })(
            <TreeSelect style={{width: '100%'}} placeholder="请选择" allowClear>
              {loop(menuList)}
            </TreeSelect>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

MenuModal.propTypes = {};
MenuModal.defaultProps = {};

export default Form.create()(MenuModal);
