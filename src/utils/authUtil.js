/**
 * Created by haojiachen on 2016/6/13.
 */
import request from './request';
import fetchError from './fetchError';

const checkToken = () => {
  //向服务器验证token有效性
  return request.post('api/auth/checkToken');
};


/**
 * 权限验证,验证cookie中是否存在token
 * @param next
 * @param replace
 * @param callback
 */
const requireAuth = async(next, replace, callback) => {
  const result = await checkToken();
  if (result !== true) {
    new fetchError(0, '身份信息已过期!').showError();
    replace('/login');
  }
  callback();
};

const autoLogin = async(next, replace, callback) => {

  const result = await checkToken();
  if (result === true) {
    replace('/app');
  }
  callback();
};

export {requireAuth, autoLogin}

