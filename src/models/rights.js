/**
 * Created by haojiachen on 2016/12/12.
 */
import * as rightsService from '../services/rights';
export default {

  namespace: 'rights',

  state: {
    rightsList: [],
    queryFilter: {},
    visible: false,
    item: {},
  },

  effects: {
    *query ({ payload }, { call, put }){
      const data = yield call(rightsService.query, payload);
      if (data)
        yield put({ type: 'querySuccess', payload: { rightsList: data.rows, queryFilter: payload } });
    },
    *save ({ payload }, { call, put, select }){
      if (payload.id) {
        yield call(rightsService.update, payload);
      } else {
        yield call(rightsService.create, payload);
      }
      yield put({ type: 'hideModal' });
      const queryFilter = yield select(state => state.rights.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    *del ({ payload }, { call, put, select }){
      yield call(rightsService.del, payload);

      const queryFilter = yield select(state => state.rights.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return { ...state, ...payload };
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, visible: true };
    },
    hideModal(state) {
      return { ...state, visible: false };
    },
  },

  subscriptions: {
    setup({ dispatch, history }){
      history.listen(location => {
        if (location.pathname === '/app/rights') {
          dispatch({ type: 'query', payload: location.query });
        }
      })
    }
  }
}
