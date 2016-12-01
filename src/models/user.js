/**
 * Created by haojiachen on 2016/11/30.
 */

import * as userService from '../services/user';

export default {

  namespace: 'user',

  state: {
    userList: [],
    item: {},
    visible: false,
    isAdd: false,
  },

  effects: {
    *query ({ payload }, { call, put }){
      const data = yield call(userService.query, payload);
      if (data)
        yield put({ type: 'querySuccess', payload: { userList: data.rows } });
    },
    *save ({ payload }, { call, put }){
      yield put({ type: 'hideModal' });
      yield call(userService.save, payload);
      const data = yield call(userService.query);
      if (data)
        yield put({ type: 'querySuccess', payload: { userList: data.rows } });
    },
    *del ({ payload }, { call, put }){
      yield call(userService.del, payload);
      const data = yield call(userService.query);
      if (data)
        yield put({ type: 'querySuccess', payload: { userList: data.rows } });
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
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/app/user') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    },
  }
}
