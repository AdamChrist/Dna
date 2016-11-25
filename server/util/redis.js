/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const Redis = require('ioredis');
const config = require('./../../config/env');
const client = new Redis(config.redis);

client.on('error', function (err) {
  console.log('redis error', err)
});

client.on('connect', function () {
  console.log('Redis is ready');
});

exports = module.exports = client;
