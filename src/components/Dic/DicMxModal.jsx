import React from 'react';
import {Modal, Form, Input, TreeSelect, Tree} from 'antd';

import {isDicMxCodeExists} from '../../services/dic';
import {convertToTree} from '../../utils/converter';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const DicMxModal = ({ form, visible, item = {}, onOk, onCancel, dicMxList }) => {
  const { getFieldDecorator, validateFields, getFieldsValue, } = form;

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...item, ...getFieldsValue() };
      onOk(data);
    });
  };

  const modalOpts = {
    maskClosable: false,
    title: `${!item.id ? '新增' : '修改'}数据字典`,
    visible,
    onOk: handleOk,
    onCancel,
  };

  /**
   * 检测用户是否重复
   * @param rule
   * @param value
   * @param callback
   * @param source
   */
  const isExist = (rule, value, callback, source) => {
    if (!value || value === item.code) {
      callback();
    } else {
      if (item.id) {
        source.id = item.id;
      }
      //编码只判断类别内是否重复
      source.dictionaryId = item.dictionaryId;
      //校验重复
      isDicMxCodeExists(source).then(result => {
        result ? callback([new Error('抱歉，该编码已被占用。')]) : callback();
      }).catch((error) => {
        error.showError && error.showError();
      });
    }
  };
  //转成树形结构
  const treeList = convertToTree(dicMxList).filter((n) => {
    return !n.pid;
  });

  const loop = (data, parentId) => data.map((n) => {
    const disable = n.id == item.id;
    if (n.children && n.children.length > 0) {
      return (
        <TreeNode value={n.id} key={n.id} title={n.name} disabled={disable}>
          {loop(n.children, n.id)}
        </TreeNode>
      );
    }
    return <TreeNode value={n.id} key={n.id} title={n.name} disabled={disable} />;
  });

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="名称：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              { required: true, message: '不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="编码：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              { required: true, message: '不能为空' },
              { validator: isExist }
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="上级组织">
          {getFieldDecorator('pid', {
            initialValue: item.pid
          })(
            <TreeSelect style={{ width: '100%' }} placeholder="请选择" allowClear>
              {loop(treeList)}
            </TreeSelect>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

DicMxModal.propTypes = {};
DicMxModal.defaultProps = {};

export default Form.create()(DicMxModal);
