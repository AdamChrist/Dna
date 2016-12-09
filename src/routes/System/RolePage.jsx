import React from "react";
import {RoleModal, RoleList, MenuModal} from "../../components/Role";

const RolePage = ({role, dispatch, menu}) => {

  const {roleList, visible, item, menuVisible, selectedMenus} = role;

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

  const RoleModalGen = () =>
    <RoleModal {...roleModalProps} />;

  return (
    <div>
      <RoleList {...roleListProps} />
      <RoleModalGen />
      <MenuModal {...menuModalProps} />
    </div>
  );
};

RolePage.propTypes = {};
RolePage.defaultProps = {};

export default RolePage;
