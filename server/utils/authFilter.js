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
const checkExcludeUrl = (path) => {
  const excludeUrls = config.auth.excludeUrl;
  return excludeUrls.some(url => {
    let re = pathToRegexp(url);
    return re.test(path);
  });
};

/**
 * 解析token
 * @param token
 */
const decodedToken = (token) => {
  if (!token) return null;
  const decoded = jwt.verify(token, config.secret);
  const user = decoded.user;
  const expireTime = decoded.expireTime;
  return { user, expireTime }
};

module.exports = {
  /**
   * 验证用户是否有权限
   */
  isAuthenticated: async(req, res, next) => {
    const { path, method } = req;
    //如果是预请求.直接跳过
    if (checkOptions(method)) return res.send(200);
    //匹配不验证的token请求
    if (checkExcludeUrl(path)) {
      console.log(`不验证API权限,URL:${path}`);
      return next();
    }
    console.log(`验证API权限,URL:${path}`);
    //获取token
    const token = req.cookies.token || req.headers['x-auth-token'];
    //解析token
    const tokenInfo = decodedToken(token);
    if (tokenInfo) {
      const { user, expireTime } = tokenInfo;
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
        if (userToken === token) {
          const rights = JSON.parse(await redis.get('CACHE_RIGHTS'));
          //获取redis缓存的用户权限信息
          const userAuth = JSON.parse(await redis.get(`auth-${userId}`));
          req.user = { ...user, ...userAuth };
          if (rights && rights.length > 0) {
            //判断url是否需要校验权限
            const isNeedValidate = rights.some(n => {
              let re = pathToRegexp(n.url);
              return re.test(path) && method.toString().toUpperCase() === n.method.toString().toUpperCase();
            });
            if (isNeedValidate) {
              //判断用户是否有权限
              const hasRights = userAuth.rights.some(n => {
                let re = pathToRegexp(n.url);
                return re.test(path) && method.toString().toUpperCase() === n.method.toString().toUpperCase();
              });
              if (hasRights) {
                return next();
              } else {
                console.error('无权访问!');
                return res.error('无权访问!');
              }
            }
          }
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
