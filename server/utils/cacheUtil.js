/**
 * Created by haojiachen on 2016/12/14.
 */

const redis = require('./redis');
const db = require('../model');

//同步权限缓存
const syncRights = async() => {
  const rights = await db.Rights.findAll();
  redis.set('CACHE_RIGHTS', JSON.stringify(rights));
};
module.exports = {
  syncRights
};
