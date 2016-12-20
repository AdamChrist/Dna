import React from 'react';
import {connect} from 'dva';
import {DicTree, DicModal, DicList, DicMxModal} from '../../components/Dic';

const DicPage = ({ dic, dispatch }) => {

  const { dicList, dicModal, dicSelectKey, dicMxList, dicMxModal } = dic;

  const dicTreePros = {
    dicList,
    dicSelectKey,
    onSelect(dicSelectKeys){
      dispatch({ type: 'dic/queryDicMx', payload: dicSelectKeys })
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
        payload: { id }
      });
    },
    onAdd(){
      dispatch({
        type: 'dic/showDicModal'
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

  const dicListProps = {
    dicMxList,
    dicSelectKey,
    onDelete(id) {
      dispatch({
        type: 'dic/delDicMx',
        payload: id
      });
    },
    onEdit(data) {
      dispatch({
        type: 'dic/showDicMxModal',
        payload: {
          item: data
        }
      });
    },
    onAdd(){
      dispatch({
        type: 'dic/showDicMxModal',
        payload: {
          item: { dictionaryId: dicSelectKey }
        }
      });
    }
  };

  const disMxModalPros = {
    ...dicMxModal,
    dicMxList,
    onOk(data){
      dispatch({ type: 'dic/saveDicMx', payload: data });
    },
    onCancel() {
      dispatch({
        type: 'dic/hideDicMxModal'
      });
    },
  };

  const DicModalGen = () =>
    <DicModal {...dicModalPros} />;
  const DicMxModalGen = () =>
    <DicMxModal {...disMxModalPros} />;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexShrink: 0, width: '300px' }}>
        <DicTree {...dicTreePros} />
      </div>
      <div style={{ width: '100%', marginLeft: '16px' }}>
        <DicList {...dicListProps} />
      </div>
      <DicModalGen />
      <DicMxModalGen />
    </div>
  );
};

DicPage.propTypes = {};
DicPage.defaultProps = {};

const mapStateToProps = ({ dic }) => {
  return { dic };
};

export default connect(mapStateToProps)(DicPage);
