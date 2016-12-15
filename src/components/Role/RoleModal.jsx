import React from 'react';
import {Form, Input, Modal} from 'antd';
import {isRoleExists} from '../../services/role';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const RoleModal = ({form, visible, item = {}, onOk, onCancel}) => {
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
    title: `${!item.id ? '新增' : '修改'}角色`,
    visible,
    onOk: handleOk,
    onCancel,
  };

  const checkName = (rule, value, callback, source) => {
    if (!value || value === item.name) {
      callback();
    } else {
      if (item.id) {
        source.id = item.id;
      }
      //校验唯一
      isRoleExists(source).then(result => {
        result ? callback([new Error('抱歉，该名称已存在!')]) : callback();
      }).catch((error) => {
        error.showError && error.showError();
      });
    }
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="名称：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {required: true, message: '名称未填写'},
              {validator: checkName}
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="备注：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('remark', {
            initialValue: item.remark
          })(
            <Input type="text"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

RoleModal.propTypes = {};
RoleModal.defaultProps = {};

export default Form.create()(RoleModal);
