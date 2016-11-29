/**
 * Created by haojiachen on 2016/11/29.
 * 高级搜索组件,需要指定onSearch的查询回调和formItems的表单组件
 */
import React, {Component, PropTypes} from 'react';
import {Form, Row, Col, Input, Button, Icon} from 'antd';

class AdvancedSearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { expand: false }
  }

  /**
   * 搜索
   * @param e
   */
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //触发搜索的回调函数
      this.props.onSearch(values);
    });
  };

  /**
   * 重置
   */
  handleReset = () => {
    this.props.form.resetFields();
  };

  /**
   * 收缩
   */
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { formItems, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const expand = this.state.expand;
    const showExpand = formItems.length > 6;

    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40} className={expand ? "form-item-show" : "form-item-hide"}>
          {
            formItems.map((item, i) => {
              return (
                <Col span={8} key={i}>
                  <Form.Item {...formItemLayout} label={item.label}>
                    {getFieldDecorator(item.fieldName)(
                      item.render
                    )}
                  </Form.Item>
                </Col>
              );
            })
          }
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            {
              showExpand ?
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  <Icon type={expand ? 'up' : 'down'} />
                </a> : ''
            }
          </Col>
        </Row>
      </Form>
    );
  }
}

/**
 * onSearch: 搜索的回调函数
 * searchFormItems: 表单的Item
 */
AdvancedSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  formItems: PropTypes.array.isRequired
};

export default Form.create()(AdvancedSearchForm);
