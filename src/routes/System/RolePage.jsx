import React from "react";
import {RoleModal, RoleList, MenuModal, RightsModal} from "../../components/Role";

const RolePage = ({role, dispatch, menu, rights}) => {

  const {roleList, visible, item, menuVisible, selectedMenus, rightsVisible, selectedRights} = role;

  const roleListProps = {
    roleList,
    onDelete(id) {
      dispatch({type: 'role/del', payload: id});
    },
    onEdit(data) {
      dispatch({type: 'role/showModal', payload: {item: data}});
    },
    onAdd(){
      dispatch({type: 'role/showModal', payload: {item: {}}});
    },
    onEditRoleMenu(item){
      const selectedMenus = item.menus.map(n => n.id);
      dispatch({type: 'role/showMenuModal', payload: {selectedMenus, item}});
    },
    onEditRoleRights(item){
      const selectedRights = item.rights.map(n => n.id);
      dispatch({type: 'role/showRightsModal', payload: {selectedRights, item}});
    }
  };

  const roleModalProps = {
    item,
    visible,
    onOk(data) {
      dispatch({type: 'role/save', payload: data});
    },
    onCancel() {
      dispatch({type: 'role/hideModal'});
    },
  };

  const menuModalProps = {
    selectedMenus,
    menuList: menu.menuList,
    visible: menuVisible,
    onOk() {
      dispatch({type: 'role/saveRoleMenu',});
    },
    onCancel() {
      dispatch({type: 'role/hideMenuModal'});
    },
    onRowChange(selectedRowKeys){
      dispatch({type: 'role/selectMenu', payload: selectedRowKeys})
    }
  };

  const rightsModalProps = {
    selectedRights,
    rightsList: rights.rightsList,
    visible: rightsVisible,
    onOk() {
      dispatch({type: 'role/saveRoleRights',});
    },
    onCancel() {
      dispatch({type: 'role/hideRightsModal'});
    },
    onRowChange(selectedRowKeys){
      dispatch({type: 'role/selectRights', payload: selectedRowKeys})
    }
  };

  const RoleModalGen = () =>
    <RoleModal {...roleModalProps} />;

  return (
    <div>
      <RoleList {...roleListProps} />
      <RoleModalGen />
      <MenuModal {...menuModalProps} />
      <RightsModal {...rightsModalProps} />
    </div>
  );
};

RolePage.propTypes = {};
RolePage.defaultProps = {};

export default RolePage;
