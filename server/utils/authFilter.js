/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';
//Express的url正则编译公式
const pathToRegexp = require('path-to-regexp');
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const redis = require('./redis');

module.exports = {
  /**
   * 验证用户是否有权限
   */
  isAuthenticated: async function (req, res, next) {
    console.log(`验证API权限,URL:${req.path}`);
    //如果是预请求.直接跳过
    if (req.method === 'OPTIONS') {
      console.log('OPTIONS预请求');
      //让options请求快速返回
      return res.send(200);
    }
    //匹配不验证的token请求
    for (let url of config.auth.excludeUrl) {
      let re = pathToRegexp(url);
      if (re.test(req.path)) {
        console.log('不验证的URL:', req.path);
        return next();
      }
    }
    //获取token
    const token = req.cookies.token || req.headers['x-auth-token'];
    console.log('token:', token);
    if (token) {
      //验证token是否过期
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.userId;
      const expireTime = decoded.expireTime;
      //如果已过期,返回401
      if (Date.now() >= expireTime) {
        //redis key 过期
        redis.del(userId);
        console.log('token过期!');
        res.clearCookie('token');
        return res.sendStatus(401);
      }
      try {
        const result = await redis.get(userId);
        if (result === token) {
          req.user = { id: userId };
          return next();
        }
        else {
          res.clearCookie('token');
          return res.sendStatus(401);
        }
      }
      catch (err) {
        console.log(err);
        return res.sendStatus(500)
      }
    } else {
      console.log('token为空,验证失败!');
      return res.sendStatus(401)
    }
  }
};
