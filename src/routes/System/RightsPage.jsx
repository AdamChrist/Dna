/**
 * Created by haojiachen on 2016/12/12.
 */
import React from "react";
import {RightsList, RightsModal} from "../../components/Rights";

const RightsPage = ({rights, dispatch}) => {
  const {rightsList, visible, item} = rights;

  const rightsListProps = {
    rightsList,
    onDelete(id) {
      dispatch({type: 'rights/del', payload: id});
    },
    onEdit(data) {
      dispatch({type: 'rights/showModal', payload: {item: data}});
    },
    onAdd(){
      dispatch({type: 'rights/showModal', payload: {item: {}}});
    },
  };

  const rightsModalProps = {
    item,
    visible,
    onOk(data) {
      dispatch({type: 'rights/save', payload: data});
    },
    onCancel() {
      dispatch({type: 'rights/hideModal'});
    },
  };

  const RightsModalGen = () =>
    <RightsModal {...rightsModalProps} />;
  return (
    <div>
      <RightsList {...rightsListProps} />
      <RightsModalGen />
    </div>
  );
};

RightsPage.propTypes = {};
RightsPage.defaultProps = {};

export default RightsPage;
