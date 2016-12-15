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
    rightsVisible: false,
    selectedRights: [],
  },

  effects: {
    *query ({ payload }, { call, put }){
      const data = yield call(roleService.query, payload);
      if (data)
        yield put({ type: 'querySuccess', payload: { roleList: data.rows, queryFilter: payload } });
    },
    *save ({ payload }, { call, put, select }){
      yield put({ type: 'hideModal' });
      if (payload.id) {
        yield call(roleService.update, payload);
      } else {
        yield call(roleService.create, payload);
      }

      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    *del ({ payload }, { call, put, select }){
      yield call(roleService.del, payload);

      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    * saveRoleMenu ({ payload }, { call, put, select }){
      yield put({ type: 'hideMenuModal' });
      //选择的menus和当前的角色信息
      const selectedMenus = yield select(state => state.role.selectedMenus);
      const item = yield select(state => state.role.item);
      item.menus = selectedMenus;
      //保存角色菜单关联
      yield call(roleService.saveRoleMenu, item);
      //刷新表单
      const queryFilter = yield select(state => state.role.queryFilter);
      yield put({ type: 'query', payload: queryFilter });
    },
    * saveRoleRights ({ payload }, { call, put, select }){
      yield put({ type: 'hideRightsModal' });
      //选择的rights和当前的角色信息
      const selectedRights = yield select(state => state.role.selectedRights);
      const item = yield select(state => state.role.item);
      item.rights = selectedRights;
      //保存角色菜单关联
      yield call(roleService.saveRoleRights, item);
      //刷新表单
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
    showMenuModal(state, { payload }) {
      return { ...state, ...payload, menuVisible: true };
    },
    hideMenuModal(state) {
      return { ...state, menuVisible: false };
    },
    selectMenu(state, { payload }){
      return { ...state, selectedMenus: payload }
    },
    showRightsModal(state, { payload }) {
      return { ...state, ...payload, rightsVisible: true };
    },
    hideRightsModal(state) {
      return { ...state, rightsVisible: false };
    },
    selectRights(state, { payload }){
      return { ...state, selectedRights: payload }
    }
  },

  subscriptions: {
    setup({ dispatch, history }){
      history.listen(location => {
        if (location.pathname === '/app/role') {
          dispatch({ type: 'query', payload: location.query });
          dispatch({ type: 'menu/query', payload: location.query });
          dispatch({ type: 'rights/query', payload: location.query });
        }
      })
    }
  }
}
