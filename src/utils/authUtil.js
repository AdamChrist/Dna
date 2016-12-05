/**
 * Created by haojiachen on 2016/6/13.
 */
import request from './request';


const checkToken = async() => {
  //向服务器验证token有效性
  const isValid = await request.post(`api/auth/checkToken`);
  return isValid;
}


/**
 * 权限验证,验证cookie中是否存在token
 * @param next
 * @param replace
 * @param callback
 */
const requireAuth = (next, replace, callback) => {
  request.post(`api/auth/checkToken`).then(() => {
    callback();
  }).catch(() => {
    replace('/login');
    callback();
  });
};

const autoLogin = (next, replace, callback) => {
  request.post(`api/auth/checkToken`).then(() => {
    replace('/app');
    callback();
  }).catch(() => {
    callback();
  });
};

export {requireAuth, autoLogin}

