/**
 * Created by haojiachen on 2016/12/6.
 */
import * as dicService from '../services/dic';

export default {

  namespace: 'dic',

  state: {
    dicSelectKey: '',
    dicList: [],
    dicMxList: [],
    dicModal: {
      visible: false,
      item: {}
    },
    dicMxModal: {
      visible: false,
      item: {}
    },
  },

  effects: {
    *queryDic ({ payload }, { call, put }){
      const data = yield call(dicService.queryDic);
      if (data)
        yield put({ type: 'queryDicSuccess', payload: { dicList: data.rows } });
    },
    *saveDic ({ payload }, { call, put }){
      yield put({ type: 'hideDicModal' });

      if(payload.id){
        yield call(dicService.updateDic, payload);
      }else{
        yield call(dicService.createDic, payload);
      }

      yield put({ type: 'queryDic' });
    },
    *delDic ({ payload }, { call, put }){
      yield call(dicService.delDic, payload);
      //查询
      yield put({ type: 'queryDic' });
      //清空类别选择
      yield put({ type: 'selectDic', payload: { dicSelectKey: '' } });
      //清空数据字典列表
      yield put({ type: 'resetDicMx' });
    },
    *queryDicMx({ payload }, { call, put }){
      yield put({ type: 'selectDic', payload: { dicSelectKey: payload } });

      const data = yield call(dicService.queryDicMx, payload);
      if (data)
        yield put({ type: 'queryDicMxSuccess', payload: { dicMxList: data.rows } });
    },
    *saveDicMx ({ payload }, { call, put, select }){
      yield put({ type: 'hideDicMxModal' });
      if (payload.id) {
        yield call(dicService.updateDicMx, payload);
      } else {
        yield call(dicService.createDicMx, payload)
      }

      const dicSelectKey = yield select(state => state.dic.dicSelectKey);
      yield put({ type: 'queryDicMx', payload: dicSelectKey });
    },
    *delDicMx ({ payload }, { call, put, select }){
      yield call(dicService.delDicMx, payload);

      const dicSelectKey = yield select(state => state.dic.dicSelectKey);
      yield put({ type: 'queryDicMx', payload: dicSelectKey });
    },
  },

  reducers: {
    queryDicSuccess(state, { payload }){
      return { ...state, ...payload };
    },
    selectDic(state, { payload }){
      return { ...state, ...payload };
    },
    showDicModal(state, { payload }) {
      if (payload && payload.id) {
        const item = _.find(state.dicList, { 'id': payload.id });
        return { ...state, dicModal: { ...state.dicModal, item, visible: true } };
      } else {
        return { ...state, dicModal: { ...state.dicModal, item: {}, visible: true } };
      }
    },
    hideDicModal(state) {
      return { ...state, dicModal: { ...state.dicModal, visible: false } };
    },
    queryDicMxSuccess(state, { payload }){
      return { ...state, ...payload };
    },
    showDicMxModal(state, { payload }) {
      return { ...state, dicMxModal: { ...state.dicModal, ...payload, visible: true } };
    },
    hideDicMxModal(state) {
      return { ...state, dicMxModal: { ...state.dicMxModal, visible: false } };
    },
    resetDicMx(state){
      return { ...state, dicMxList: [] };
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/app/dic') {
          dispatch({ type: 'queryDic' });
        }
      });
    }
  }
}
