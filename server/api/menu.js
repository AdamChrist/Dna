/**
 * Created by haojiachen on 2016/12/7.
 */
const baseRouter = require('../utils/baseRouter');
const router = require('express').Router();
const db = require('../model');
/**
 * 查询所有
 */
router.post('/query', async(req, res) => {
  try {
    const queryFilter = req.queryFilter(req.body);
    const result = await db.Menu.findAndCountAll(queryFilter);
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 保存
 */
router.post('/', async(req, res) => {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.Menu.create(model);
    }
    else {
      result = await db.Menu.update(model, { where: { id: model.id } });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 删除
 */
router.delete('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.Menu.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

module.exports = baseRouter(router, 'Menu');
