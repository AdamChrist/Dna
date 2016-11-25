/**
 * Created by haojiachen on 2016/7/8.
 */
'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/env');
const Filter = require('../util/queryFilter');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, { host: config.mysql.host, dialect: 'mysql' });
const db = {};

// system
db.User = require('./User')(sequelize, Sequelize);
db.Dictionary = require('./Dictionary')(sequelize, Sequelize);
db.DictionaryMx = require('./DictionaryMx')(sequelize, Sequelize);
db.Sequences = require('./Sequences')(sequelize, Sequelize);

// business

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Filter = Filter;

module.exports = db;

// db.TeacherRecord.findOne({ include: { model: db.Teacher } }).then(result=>console.log(JSON.stringify(result)));

//
// db.DictionaryMx.findAll({
//   where: {
//     '$dictionary.code$': 'abc'
//   },
//   include: { model: db.Dictionary }
// }).then(result=> {
//   console.log(result);
// });


/*
 models.User.findAll({
 where: {
 '$Task.title$': { '$like': 't1' }
 },
 include: [{
 model: models.Task
 }]
 }).then(function (users) {
 console.log(users[0].taskName)
 res.render('index', {
 title: 'Express',
 users: users
 });
 });

 module.exports = function (sequelize, DataTypes) {
 var User = sequelize.define("User", {
 username: { type: DataTypes.STRING, unique: true },
 taskName: {
 type: DataTypes.VIRTUAL,
 get: function () {
 console.log('virtual', this.dataValues.Task.title)
 return this.dataValues.Task.title;
 },
 }
 }, {
 paranoid: true,
 classMethods: {
 associate: function (models) {
 User.belongsTo(models.Task)
 }
 }
 });

 return User;
 };*/