/**
 * Created by haojiachen on 2016/11/25.
 */
import {notification} from 'antd';
import {routerRedux} from 'dva/router';
import * as authService from '../services/auth';

export default {

  namespace: 'common',

  state: {
    user: {},
    menus: []
  },

  effects: {
    * login ({payload}, {call, put}){
      yield call(authService.login, payload);
      //跳转登录
      yield put(routerRedux.push('/app'));
      notification.success({
        message: '登录成功!',
        description: `欢迎${data.userName ? data.userName : '您使用!'}`
      });
    },
    * getUserInfo ({payload}, {call, put}){
      const user = yield call(authService.getUserInfo);
      console.log(user);
      yield put({type: 'getUserInfoSuccess', payload: {user}})
    },
  },

  reducers: {
    getUserInfoSuccess(state, {payload}){
      return {...state, ...payload}
    }
  },

  subscriptions: {}
}
