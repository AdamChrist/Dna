/**
 * Created by haojiachen on 2016/12/5.
 */
const router = require('express').Router();
const db = require('../model');
/**
 * 查询所有角色
 */
router.post('/query', async(req, res) => {
  try {
    const queryFilter = req.queryFilter(req.body);
    const result = await db.Role.findAndCountAll(queryFilter);
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 保存角色
 */
router.post('/', async(req, res) => {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.Role.create(model);
    }
    else {
      result = await db.Role.update(model, { where: { id: model.id } }, { fields: ['name', 'remark'] });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 删除角色
 */
router.delete('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.Role.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

module.exports = router;
