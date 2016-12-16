/**
 * Created by haojiachen on 2016/12/12.
 */
import React from 'react';
import {RightsList, RightsModal} from '../../components/Rights';
import AdvancedSearchForm from '../../components/Common/AdvancedSearchForm';
import {Input, Select} from 'antd';

const RightsPage = ({ rights, dispatch }) => {
  const { rightsList, visible, item } = rights;

  const searchProps = {
    onSearch(values){
      dispatch({
        type: 'rights/query',
        payload: values
      });
    },
    formItems: [
      { label: '名称', fieldName: 'name.$like', render: <Input placeholder="名称" /> },
      { label: '编码', fieldName: 'code.$like', render: <Input placeholder="编码" /> },
      { label: 'url', fieldName: 'url.$like', render: <Input placeholder="url" /> },
      {
        label: '请求类型', fieldName: 'method.$like', render: (
        <Select size="large">
          <Select.Option value="get">GET</Select.Option>
          <Select.Option value="post">POST</Select.Option>
          <Select.Option value="delete">DELETE</Select.Option>
          <Select.Option value="put">PUT</Select.Option>
        </Select>
      )
      },
      {
        label: '样式', fieldName: 'type.$like',
        render: (
          <Select>
            <Select.Option value="hide">隐藏</Select.Option>
            <Select.Option value="disabled">禁用</Select.Option>
          </Select>
        )
      },
    ]
  };

  const rightsListProps = {
    rightsList,
    onDelete(id) {
      dispatch({ type: 'rights/del', payload: id });
    },
    onEdit(data) {
      dispatch({ type: 'rights/showModal', payload: { item: data } });
    },
    onAdd(){
      dispatch({ type: 'rights/showModal', payload: { item: {} } });
    },
  };

  const rightsModalProps = {
    item,
    visible,
    onOk(data) {
      dispatch({ type: 'rights/save', payload: data });
    },
    onCancel() {
      dispatch({ type: 'rights/hideModal' });
    },
  };

  const RightsModalGen = () =>
    <RightsModal {...rightsModalProps} />;
  return (
    <div>
      <AdvancedSearchForm {...searchProps} />
      <RightsList {...rightsListProps} />
      <RightsModalGen />
    </div>
  );
};

RightsPage.propTypes = {};
RightsPage.defaultProps = {};

export default RightsPage;
