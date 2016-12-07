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
      isAdd: false,
      item: {}
    },
    dicMxModal: {
      visible: false,
      isAdd: false,
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
      yield call(dicService.saveDic, payload);

      yield put({ type: 'queryDic' });
    },
    *delDic ({ payload }, { call, put }){
      yield call(dicService.delDic, payload);

      yield put({ type: 'queryDic' });
      yield put({ type: 'selectDic', payload: { dicSelectKey: '' } });
    },
    *queryDicMx({ payload }, { call, put }){
      yield put({ type: 'selectDic', payload: { dicSelectKey: payload } });

      const data = yield call(dicService.queryDicMx, payload);
      if (data)
        yield put({ type: 'queryDicMxSuccess', payload: { dicMxList: data.rows } });
    },
    *saveDicMx ({ payload }, { call, put, select }){
      yield put({ type: 'hideDicMxModal' });
      yield call(dicService.saveDicMx, payload);

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
      const { isAdd, id } = payload;
      if (isAdd) {
        return { ...state, dicModal: { ...state.dicModal, isAdd, item: {}, visible: true } };
      } else {
        const item = _.find(state.dicList, { 'id': id });
        return { ...state, dicModal: { ...state.dicModal, isAdd, item, visible: true } };
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
