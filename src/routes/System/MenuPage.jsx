import React from 'react';

import {MenuList, MenuModal} from '../../components/Menu';

const MenuPage = ({menu, dispatch}) => {
  const {menuList, visible, item}=menu;
  const listProps = {
    menuList,
    onDelete(id) {
      dispatch({
        type: 'menu/del',
        payload: id
      });
    },
    onEdit(data) {
      dispatch({
        type: 'menu/showModal',
        payload: {
          item: data
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'menu/showModal',
        payload: {
          item: {}
        }
      });
    }
  };

  const modalProps = {
    menuList,
    item,
    visible,
    onOk(data) {
      dispatch({
        type: 'menu/save',
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'menu/hideModal'
      });
    },
  };

  const MenuModalGen = () =>
    <MenuModal {...modalProps} />;
  return (
    <div>
      <MenuList {...listProps}/>
      <MenuModalGen/>
    </div>
  );
};

MenuPage.propTypes = {};
MenuPage.defaultProps = {};

export default MenuPage;

