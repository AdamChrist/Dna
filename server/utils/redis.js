/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const Redis = require('ioredis');
const config = require('./../../config/env');
const client = new Redis(config.redis);

const cacheUtil = require('./cacheUtil');

client.on('error', (err) => {
  console.log('redis error', err)
});

client.on('connect', async() => {
  console.log('Redis is ready');
});

exports = module.exports = client;
