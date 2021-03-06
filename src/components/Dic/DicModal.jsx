import React from 'react';
import {Modal, Form, Input} from 'antd';
import {isDicCodeExists} from '../../services/dic';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const DicModal = ({form, visible, item = {}, onOk, onCancel}) => {

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
    title: `${!item.id ? '新增' : '修改'}数据字典类别`,
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
      //校验重复
      isDicCodeExists(source).then(result => {
        result ? callback([new Error('抱歉，该编码已被占用。')]) : callback();
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
              {required: true, message: '不能为空'},
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
        <FormItem label="编码：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {required: true, message: '不能为空'},
              {validator: isExist}
            ],
          })(
            <Input type="text"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

DicModal.propTypes = {};
DicModal.defaultProps = {};

export default Form.create()(DicModal);
