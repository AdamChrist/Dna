/**
 * Created by haojiachen on 2016/7/8.
 */

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

const all = {
  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../../'),
  port: process.env.PORT || 9000,
  secret: 'dna',
  // MySQL 配置
  mysql: {
    database: 'dna',
    username: 'nodeweb',
    password: 'nodeweb'
  },
  // redis 配置
  redis: {
    port: 6379,
    ttl: 2592000,
  },
  tempPath: './temp/files',
  // 权限配置
  auth: {
    excludeUrl: [
      '/login',
      '/api/auth/checkToken',
      '/api/auth/login',
      '/api/file/upload/*'
    ],
    adminAccount: 'admin',
    adminPwd: 'abc@123',
    adminId: '1111111-0000-0000-0000-99999999',
    adminName: '超级管理员',
  },
};

let config = _.merge(all, require('./' + all.env + '.js') || {});

// 加载私有配置
if (fs.existsSync(path.join(__dirname, 'private/index.js'))) {
  config = _.merge(config, require(path.join(__dirname, 'private/index.js')) || {});
}

module.exports = config;
