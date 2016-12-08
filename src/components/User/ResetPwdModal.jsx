import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import md5 from 'js-md5';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const ResetPwdModal = ({ form, item, pwdVisible, onOk, onCancel }) => {
  const { getFieldDecorator, validateFields, getFieldValue } = form;

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const password = md5(getFieldValue('password'));
      const data = { ...item, password };
      onOk(data);
    });
  };

  const modalOpts = {
    maskClosable: false,
    title: '修改密码',
    visible: pwdVisible,
    onOk: handleOk,
    onCancel,
  };

  const checkPwd = (rule, value, callback) => {
    if (value) {
      validateFields(['rePassword'], { force: true });
    }
    callback();
  };

  const reCheckPwd = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem {...formItemLayout} label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请填写密码' },
              { validator: checkPwd }
            ]
          })(
            <Input type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码" hasFeedback>
          {getFieldDecorator('rePassword', {
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: reCheckPwd }
            ]
          })(
            <Input type="password" placeholder="请输入确认密码" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

ResetPwdModal.propTypes = {};
ResetPwdModal.defaultProps = {};

export default Form.create()(ResetPwdModal);
