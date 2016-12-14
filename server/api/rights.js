/**
 * Created by haojiachen on 2016/12/12.
 */
const baseRouter = require('../utils/baseRouter');
const router = require('express').Router();
const db = require('../model');
const cacheUtil = require('../utils/cacheUtil');
/**
 * 保存
 */
router.post('/', async(req, res) => {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.Rights.create(model);
    }
    else {
      result = await db.Rights.update(model, { where: { id: model.id } }, { fields: Object.keys(model) });
    }
    cacheUtil.syncRights();
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
    const result = await db.Rights.destroy({ where: { id: id } });
    cacheUtil.syncRights()
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

module.exports = baseRouter(router, 'Rights');
