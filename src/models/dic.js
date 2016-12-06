/**
 * Created by haojiachen on 2016/12/6.
 */
import * as dicService from '../services/dic';

export default {

  namespace: 'dic',

  state: {
    dicSelectKeys: '',
    dicList: [],
    dicModal: {
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
    *saveDic ({ payload }, { call, put, select }){
      yield put({ type: 'hideDicModal' });
      yield call(dicService.saveDic, payload);

      yield put({ type: 'queryDic' });
    },
    *delDic ({ payload }, { call, put, select }){
      yield call(dicService.delDic, payload);

      yield put({ type: 'queryDic' });
      yield put({ type: 'selectDic', payload: { dicSelectKeys: '' } });
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
        console.log(item);
        return { ...state, dicModal: { ...state.dicModal, isAdd, item, visible: true } };
      }
    },
    hideDicModal(state) {
      return { ...state, dicModal: { ...state.dicModal, visible: false } };
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
