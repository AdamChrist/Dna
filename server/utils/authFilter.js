/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';
//Express的url正则编译公式
const pathToRegexp = require('path-to-regexp');
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const redis = require('./redis');

/**
 * 检查预请求
 * @param req
 * @returns {boolean}
 */
const checkOptions = (req) => {
  return req.method === 'OPTIONS';
};
/**
 * 检查不验证的URL
 * @param req
 */
const checkExcludeUrl = (req) => {
  const excludeUrls = config.auth.excludeUrl;
  return excludeUrls.some(url => {
    let re = pathToRegexp(url);
    return re.test(req.path);
  });
};

/**
 * 解析token
 * @param req
 */
const decodedToken = (token) => {
  if (!token) return null;
  const decoded = jwt.verify(token, config.secret);
  const user = decoded.user;
  const expireTime = decoded.expireTime;
  return {user, expireTime}
};

module.exports = {
  /**
   * 验证用户是否有权限
   */
  isAuthenticated: async function (req, res, next) {
    //如果是预请求.直接跳过
    if (checkOptions(req)) return res.send(200);
    //匹配不验证的token请求
    if (checkExcludeUrl(req)) {
      console.log(`不验证API权限,URL:${req.path}`);
      return next();
    }
    console.log(`验证API权限,URL:${req.path}`);
    //获取token
    const token = req.cookies.token || req.headers['x-auth-token'];
    //解析token
    const tokenInfo = decodedToken(token);
    if (tokenInfo) {
      const {user, expireTime} = tokenInfo;
      const userId = user.id;
      //如果已过期,返回401
      if (Date.now() >= expireTime) {
        //redis key 过期
        await redis.del(userId);
        console.error('token过期!');
        res.clearCookie('token');
        return res.sendStatus(401);
      }
      try {
        //验证token
        const userToken = await redis.get(userId);
        console.log(userToken);
        if (userToken === token) {
          //获取redis缓存的用户权限信息
          const userAuth = JSON.parse(await redis.get(`auth-${userId}`));
          //todo 验证api URL权限

          req.user = {...user, ...userAuth};
          return next();
        }
        else {
          console.error('token错误!');
          res.clearCookie('token');
          return res.sendStatus(401);
        }
      }
      catch (err) {
        console.error(err);
        return res.sendStatus(500)
      }
    } else {
      console.error('token为空!');
      return res.sendStatus(401)
    }
  }
};
