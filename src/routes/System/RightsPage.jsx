/**
 * Created by haojiachen on 2016/12/12.
 */
import React from 'react';
import {connect} from 'dva';
import {RightsList, RightsModal} from '../../components/Rights';
import AdvancedSearchForm from '../../components/Common/AdvancedSearchForm';
import {Input} from 'antd';

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

const mapStateToProps = ({ rights }) => {
  return { rights };
};

export default connect(mapStateToProps)(RightsPage);
