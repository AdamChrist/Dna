/**
 * Created by haojiachen on 2016/12/9.
 */
import * as menuService from '../services/menu';
export default {

  namespace: 'menu',

  state: {
    menuList: [],
    queryFilter: {},
    visible: false,
    item: {},
  },

  effects: {
    *query ({payload}, {call, put}){
      const data = yield call(menuService.query, payload);
      if (data)
        yield put({type: 'querySuccess', payload: {menuList: data.rows, queryFilter: payload}});
    },
    *save ({payload}, {call, put, select}){
      yield put({type: 'hideModal'});
      yield call(menuService.save, payload);

      const queryFilter = yield select(state => state.menu.queryFilter);
      yield put({type: 'query', payload: queryFilter});
    },
    *del ({payload}, {call, put, select}){
      yield call(menuService.del, payload);

      const queryFilter = yield select(state => state.menu.queryFilter);
      yield put({type: 'query', payload: queryFilter});
    },
  },

  reducers: {
    querySuccess(state, {payload}) {
      return {...state, ...payload};
    },
    showModal(state, {payload}) {
      return {...state, ...payload, visible: true};
    },
    hideModal(state) {
      return {...state, visible: false};
    },
  },

  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname === '/app/menu') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      })
    }
  }
}
