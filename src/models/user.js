/**
 * Created by haojiachen on 2016/11/30.
 */

import * as userService from '../services/user';

export default {

  namespace: 'user',

  state: {
    userList: [],
  },

  effects: {
    *query ({ payload }, { call, put }){
      const userList = yield call(userService.query, payload);
      if (userList)
        yield put({ type: 'querySuccess', payload: { userList } });
    },
    *save ({ payload }, { call, put }){
      yield call(userService.save, payload);
      const userList = yield call(userService.query);
      if (userList)
        yield put({ type: 'querySuccess', payload: { userList } });
    },
    *del ({ payload }, { call, put }){
      yield call(userService.del, payload);
      const userList = yield call(userService.query);
      if (userList)
        yield put({ type: 'querySuccess', payload: { userList } });
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    },
  }
}
