/**
 * Created by haojiachen on 2016/11/30.
 */
import * as userService from '../services/user';

export default {

  namespace: 'user',

  state: {
    userList: [],
    queryFilter: {},
    item: {},
    visible: false,
    pwdVisible: false
  },

  effects: {
    *query ({ payload }, { call, put }){
      const data = yield call(userService.query, payload);
      if (data)
        yield put({ type: 'querySuccess', payload: { userList: data.rows, queryFilter: payload } });
    },
    *save ({ payload }, { call, put, select }){
      yield put({ type: 'hideModal' });
      yield call(userService.save, payload);

      const queryFilter = yield select(state => state.user.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    *del ({ payload }, { call, put, select }){
      yield call(userService.del, payload);

      const queryFilter = yield select(state => state.user.queryFilter);
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
    showPwdModal(state, { payload }) {
      return { ...state, ...payload, pwdVisible: true };
    },
    hidePwdModal(state) {
      return { ...state, pwdVisible: false };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/app/user') {
          dispatch({ type: 'query', payload: location.query });
          dispatch({ type: 'role/query' });
        }
      });
    },
  }
}
