/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const auth = require('./utils/authFilter');
const extendExpress = require('./utils/extendExpress');

module.exports = (app) => {
  const options = {
    origin: true,
    credentials: true
  };
  app.use(cors(options));
  app.use(compression());
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use('/', auth.isAuthenticated);//开启权限验证
  app.use(extendExpress);// API数据格式化
};
