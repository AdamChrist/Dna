import React from 'react';

import {RoleModal, RoleList} from '../../components/Role';

const RolePage = ({ role, dispatch }) => {

  const { roleList, visible, item } = role;

  const roleListProps = {
    roleList,
    onDelete(id) {
      dispatch({
        type: 'role/del',
        payload: id
      });
    },
    onEdit(data) {
      dispatch({
        type: 'role/showModal',
        payload: {
          item: data
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'role/showModal',
        payload: {
          item: {}
        }
      });
    }
  };

  const roleModalProps = {
    item,
    visible,
    onOk(data) {
      dispatch({
        type: 'role/save',
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'role/hideModal'
      });
    },
  };

  const RoleModalGen = () =>
    <RoleModal {...roleModalProps} />;
  return (
    <div>
      <RoleList {...roleListProps} />
      <RoleModalGen />
    </div>
  );
};

RolePage.propTypes = {};
RolePage.defaultProps = {};

export default RolePage;
