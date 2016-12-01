import React from 'react';
import {Form, Input, Modal} from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const UserModal = ({ form, visible, isAdd, item = {}, onOk, onCancel, }) => {

  const { getFieldDecorator, validateFields, getFieldsValue, } = form;

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onOk(getFieldsValue());
    });
  }

  const modalOpts = {
    maskClosable: false,
    title: `${isAdd ? '新增' : '修改'}用户`,
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="姓名：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="账号：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('account', {
            initialValue: item.account,
            rules: [
              { required: true, message: '不能为空' },
            ],
          })(
            <Input type="address" />
          )}
        </FormItem>
        <FormItem label="手机号：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('mobile', {
            initialValue: item.mobile
          })(
            <Input type="address" />
          )}
        </FormItem>
        <FormItem label="email：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('email', {
            initialValue: item.email
          })(
            <Input type="address" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

UserModal.propTypes = {};
UserModal.defaultProps = {};

export default Form.create()(UserModal);
