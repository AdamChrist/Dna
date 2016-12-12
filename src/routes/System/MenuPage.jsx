import React from 'react';
import {convertToTree, sortTree} from '../../utils/converter';
import {MenuList, MenuModal} from '../../components/Menu';

const MenuPage = ({menu, dispatch}) => {
  const {menuList, visible, item}=menu;


  //为树形 table 添加 key 的字段 ,并把线性结构转为树形结构
  const treeList = sortTree(convertToTree(menuList.map(n => Object.assign({key: n.id}, n))).filter((n) => {
    return !n.pid;
  }));

  const listProps = {
    menuList: treeList,
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
    menuList: treeList,
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

