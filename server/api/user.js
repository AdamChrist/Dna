/**
 * Created by haojiachen on 2016/7/8.
 */
const baseRouter = require('../utils/baseRouter');
const router = require('express').Router();
const db = require('../model');
const md5 = require('js-md5');
//初始密码
const DEFAULT_PWD = md5('123');
/**
 * 查询所有用户
 */
router.post('/query', async(req, res) => {
  try {
    const queryFilter = req.queryFilter(req.body);
    const result = await db.User.findAndCountAll(queryFilter);
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 保存用户
 */
router.post('/', async(req, res) => {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let user = db.User.build(model);

    if (req.isEmpty(model.id)) {
      model.password = DEFAULT_PWD;
      await db.User.create(model);
    } else {
      await db.User.update(model, { where: { id: model.id } });
    }

    //设置user和role的关联关系
    const userRoles = model.roles || [];
    await user.setRoles(userRoles);

    return res.success();
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 删除用户
 */
router.delete('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.User.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 重置用户密码
 */
router.post('/pwd', async(req, res) => {
  try {
    const body = req.body;
    if (req.isEmpty(body)) return res.error('重置密码失败，缺少参数！');
    const result = await db.User.update(body, { where: { id: body.id } }, { fields: ['password'] });
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

module.exports = baseRouter(router, 'User');
