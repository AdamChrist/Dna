/**
 * Created by haojiachen on 2016/6/13.
 */
import Cookie from 'js-cookie';
import xFetch from './request';

const signOut = () => {
  Cookie.remove('token')
};

const isLogin = () => {
  return !!Cookie.get('token')
};

/**
 * 自动登录,验证cookie的有效性,并且自动跳转到主页
 * @param next
 * @param replace
 * @param callback
 */
const autoLogin = (next, replace, callback) => {
  //已经登录则不进入
  if (isLogin()) {
    //向服务器验证token有效性
    xFetch.post(`api/auth/checkToken`).then((result) => {
      console.log('验证成功!');
      replace('/home');
      callback();
    }).catch(() => {
      console.log('服务器身份验证失败!!!');
      Cookie.remove('token');
      callback();
    })
  } else {
    callback();
  }
};

/**
 * 权限验证,验证cookie中是否存在token
 * @param next
 * @param replace
 * @param callback
 */
const requireAuth = (next, replace, callback) => {
  if (!isLogin()) {
    replace('/login')
  }
  callback();
};

export {signOut, isLogin, autoLogin, requireAuth}

