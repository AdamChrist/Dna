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
    menuVisible: false,
    selectedMenus: [],
  },

  effects: {
    *query ({payload}, {call, put}){
      const data = yield call(roleService.query, payload);
      if (data)
        yield put({type: 'querySuccess', payload: {roleList: data.rows, queryFilter: payload}});
    },
    *save ({payload}, {call, put, select}){
      yield put({type: 'hideModal'});
      yield call(roleService.save, payload);

      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({type: 'query', payload: queryFilter});
    },
    *del ({payload}, {call, put, select}){
      yield call(roleService.del, payload);

      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({type: 'query', payload: queryFilter});
    },
    * saveRoleMenu ({payload}, {call, put, select}){
      yield put({type: 'hideMenuModal'});
      //选择的menus和当前的角色信息
      const selectedMenus = yield select(state => state.role.selectedMenus);
      const item = yield select(state => state.role.item);
      item.menus = selectedMenus;
      //保存角色菜单关联
      yield call(roleService.saveRoleMenu, item);
      //刷新表单
      const queryFilter = yield select(state => state.role.queryFilter);
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
    showMenuModal(state, {payload}) {
      return {...state, ...payload, menuVisible: true};
    },
    hideMenuModal(state) {
      return {...state, menuVisible: false};
    },
    selectMenu(state, {payload}){
      return {...state, selectedMenus: payload}
    }
  },

  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if (location.pathname === '/app/role') {
          dispatch({type: 'query', payload: location.query});
          dispatch({type: 'menu/query', payload: location.query});
        }
      })
    }
  }
}
