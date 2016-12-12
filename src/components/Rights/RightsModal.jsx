/**
 * Created by haojiachen on 2016/12/12.
 */
import React from "react";
import {Form, Input, Modal, Select} from "antd";
import {isRightsExists} from "../../services/rights";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const RightsModal = ({form, visible, item = {}, onOk, onCancel}) => {
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
    title: `${!item.id ? '新增' : '修改'}权限`,
    visible,
    onOk: handleOk,
    onCancel,
  };


  const checkCode = (rule, value, callback, source) => {
    if (!value || value === item.code) {
      callback();
    } else {
      if (item.id) {
        source.id = item.id;
      }
      //校验唯一
      isRightsExists(source).then(result => {
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
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="编码：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('code', {
            initialValue: item.code,
            getValueFromEvent: (e) => e.target.value ? e.target.value.toUpperCase() : '', //自动转成大写
            rules: [
              {required: true, message: '编码未填写'},
              {validator: checkCode}
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
        <FormItem label="请求类型：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('method', {
            initialValue: item.method || 'post'
          })(
            <Select size="large">
              <Option value="get">GET</Option>
              <Option value="post">POST</Option>
              <Option value="delete">DELETE</Option>
              <Option value="put">PUT</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

RightsModal.propTypes = {};
RightsModal.defaultProps = {};

export default Form.create()(RightsModal);
;
