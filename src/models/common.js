/**
 * Created by haojiachen on 2016/11/25.
 */
import {notification} from 'antd';
import {routerRedux} from 'dva/router';
import * as authService from '../services/auth';

export default {

  namespace: 'common',

  state: {
    user: {}
  },

  effects: {
    * login ({ payload }, { call, put }){
      const data = yield call(authService.login, payload);
      yield put({ type: 'loginSuccess', payload: data });
      //跳转登录
      yield put(routerRedux.push('/app'));
      notification.success({
        message: '登录成功!',
        description: `欢迎${data.userName ? data.userName : '您使用!'}`
      });
    },
  },

  reducers: {
    loginSuccess(state, { payload }){
      return { ...state, user: payload }
    }
  },

  subscriptions: {}
}
