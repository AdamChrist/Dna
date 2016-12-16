// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//兼容es6
require('babel-register')({ presets: ['es2015', 'stage-0'] });
require('babel-polyfill');

const express = require('express');
const config = require('./../config/env');
const errorHandler = require('errorhandler');
// const cacheUtil = require('./utils/cacheUtil');

// 数据库
const models = require('./model');

// 初始化数据
// if (config.seedDB) {
//   require('./config/seed');
// }

//配置express 和 路由
const app = express();
require('./expressConfig')(app);
require('./routes')(app);

if (config.env === 'development') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    return res.status(500).send();
  });
}

// 启动数据库连接
models.sequelize.sync().then(() => {
  // web服务
  app.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    // cacheUtil.syncRights();
  });
});

exports = module.exports = app;
