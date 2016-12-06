/**
 * Created by haojiachen on 2016/7/8.
 */
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
    let result = {};
    if (req.isEmpty(model.id)) {
      model.password = DEFAULT_PWD;
      result = await db.User.create(model);
    }
    else {
      result = await db.User.update(model,
        {
          where: {
            id: model.id
          }
        },
        {
          fields: ['account', 'mobile', 'email', 'name']
        });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error);
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
    return res.error(error);
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

/**
 * 判断用户名是否在
 */
router.post('/exist', async(req, res) => {
  try {
    let model = req.body;
    if (!req.isEmpty(model.id)) {
      model.id = { '$ne': model.id }
    }
    const dic = await db.User.findOne({ where: model });
    if (dic) {
      return res.success(true);
    }
    return res.success(false);

  } catch
    (error) {
    return res.error(error.message);
  }
});

module.exports = router;
