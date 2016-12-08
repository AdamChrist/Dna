/**
 * Created by haojiachen on 2016/12/5.
 */
const baseRouter = require('../utils/baseRouter');
const router = require('express').Router();
const db = require('../model');

module.exports = baseRouter(router, 'Role');
