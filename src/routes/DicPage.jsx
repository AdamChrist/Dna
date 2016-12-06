import React from 'react';
import {DicTree, DicModal} from '../components/Dic';

const DicPage = ({ dic, dispatch }) => {

  const { dicList, dicModal, dicSelectKeys } = dic;

  const dicTreePros = {
    dicList,
    dicSelectKeys,
    onSelect(dicSelectKeys){
      dispatch({ type: 'dic/selectDic', payload: { dicSelectKeys } })
    },
    onDelete(id) {
      dispatch({
        type: 'dic/delDic',
        payload: id
      });
    },
    onEdit(id) {
      dispatch({
        type: 'dic/showDicModal',
        payload: { isAdd: false, id }
      });
    },
    onAdd(){
      dispatch({
        type: 'dic/showDicModal',
        payload: { isAdd: true }
      });
    }
  };

  const dicModalPros = {
    ...dicModal,
    onOk(data) {
      dispatch({
        type: 'dic/saveDic',
        payload: data
      });
    },
    onCancel() {
      dispatch({
        type: 'dic/hideDicModal'
      });
    },
  };

  const DicModalGen = () =>
    <DicModal {...dicModalPros} />;

  return (
    <div>
      <DicTree {...dicTreePros} />
      <DicModalGen />
    </div>
  );
};

DicPage.propTypes = {};
DicPage.defaultProps = {};

export default DicPage;
