/**
 * Created by haojiachen on 2016/7/8.
 */
const router = require('express').Router();
const db = require('../model');

router.post('/query', async function (req, res) {
  try {
    let filter = new db.Filter(req.body);
    const result = await db.User.findAndCountAll(filter);
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

router.get('/:id', async function (req, res) {
  try {
    if (req.isEmpty(req.params.id)) return res.error('参数不能为空');
    const result = await db.User.findById(req.params.id);
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

router.post('/exist', async function (req, res) {
  try {
    if (req.isEmpty(req.body.name)) return res.error('参数不能为空');
    const result = await db.User.findOne({ where: { account: req.params.name } });
    if (result) {
      return res.success((req.isEmpty(req.body.id) || req.parbodyams.id !== result.id));
    }
    return res.success(false);
  } catch (error) {
    return res.error(error);
  }
});

router.post('/', async function (req, res) {
  try {
    if (req.isEmpty(req.body)) return res.error('缺少参数');
    const model = req.body;
    let result = {};
    if (req.isEmpty(req.body.id)) {
      result = await db.User.create(req.body);
    }
    else {
      result = await db.User.update(req.body,
        {
          where: {
            id: model.id
          }
        },
        {
          fields: ['account', 'mobile', 'email']
        });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

router.delete('/:id', async function (req, res) {
  try {
    if (req.isEmpty(req.params.id)) return res.error('参数不能为空');
    const result = await db.User.destroy({ where: { id: req.params.id } });
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

/**
 * 重置用户密码
 *
 * @date 06/04/2016
 * @author huhaicheng
 */
router.post('/resetpwd', async function (req, res) {
  try {
    if (req.isEmpty(req.body)) return res.error('重置密码失败，缺少参数！');
    const result = await db.User.update(req.body,
      {
        where: {
          id: req.body.id
        }
      },
      {
        fields: ['password']
      });
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }

});
module.exports = router;
