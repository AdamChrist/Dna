/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';
// 路由
module.exports = function (app) {

  // 用户管理
  app.use('/api/user', require('./api/user'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/dic', require('./api/dictionary'));

  // 未拦截的请求
  app.use('/*', (req, res, next) => {
    return res.send(404);
  })
};
