/**
 * Created by haojiachen on 2016/12/7.
 */

import * as roleService from '../services/role';

export default {

  namespace: 'role',

  state: {
    roleList: [],
    queryFilter: {},
    visible: false,
    item: {},
  },

  effects: {
    *query ({ payload }, { call, put }){
      const data = yield call(roleService.query, payload);
      if (data)
        yield put({ type: 'querySuccess', payload: { roleList: data.rows, queryFilter: payload } });
    },
    *save ({ payload }, { call, put, select }){
      yield put({ type: 'hideModal' });
      yield call(roleService.save, payload);

      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    *del ({ payload }, { call, put, select }){
      yield call(roleService.del, payload);

      const queryFilter = yield select(state => state.role.queryFilter);
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
        if (location.pathname === '/app/role') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      })
    }
  }
}
