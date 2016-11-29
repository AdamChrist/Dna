import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Select, DatePicker} from 'antd';

import  AdvancedSearchForm from '../Common/AdvancedSearchForm';

class UserSearch extends Component {

  render() {

    const searchFormProps = {
      formItems: [
        { label: 'label1', fieldName: 'label1', render: <Input placeholder="placeholder" /> },
        { label: 'label2', fieldName: 'label2', render: <Input placeholder="placeholder" /> },
        { label: 'label3', fieldName: 'label3', render: <Input placeholder="placeholder" /> },
        { label: 'label4', fieldName: 'label4', render: <DatePicker.RangePicker /> },
        {
          label: 'label5', fieldName: 'label5',
          render: (
            <Select placeholder="Please select a country">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="use">U.S.A</Select.Option>
            </Select>
          )
        },
        { label: 'label6', fieldName: 'label6', render: <DatePicker /> },
        { label: 'label7', fieldName: 'label7', render: <Input placeholder="placeholder" /> },
        { label: 'label8', fieldName: 'label8', render: <Input placeholder="placeholder" /> },
      ],
      onSearch: (values) => {
        console.log(values, 'onSearch')
      }
    };

    return (
      <AdvancedSearchForm {...searchFormProps} />
    );
  }
}

UserSearch.propTypes = {};
UserSearch.defaultProps = {};

export default Form.create()(UserSearch);
