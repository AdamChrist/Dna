/**
 * Created by Adam on 2016-12-6.
 */
const router = require('express').Router();
const db = require('../model');
const _ = require('lodash');

/**
 * 查询
 */
router.post('/query', async(req, res) => {
  try {
    const queryFilter = req.queryFilter(req.body);
    const result = await db.Dictionary.findAndCountAll(queryFilter);
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
      result = await db.Dictionary.create(model);
    }
    else {
      result = await db.Dictionary.update(model, { where: { id: model.id } });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

/**
 * 删除
 */
router.delete('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.Dictionary.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

/**
 * 子表保存
 */
router.post('/mx', async(req, res) => {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.DictionaryMx.create(model);
    }
    else {
      result = await db.DictionaryMx.update(model, { where: { id: model.id } });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

/**
 * 子表删除
 */
router.delete('/mx/:id', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.DictionaryMx.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

/**
 * 子表查询
 */
router.get('/:id/mx', async(req, res) => {
  try {
    const id = req.params.id;
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.DictionaryMx.findAndCountAll({ where: { dictionaryId: id } });
    return res.success(result);
  } catch (error) {
    res.error(error);
  }
});


router.post('/exist', async(req, res) => {
  try {
    let model = req.body;
    if (!req.isEmpty(model.id)) {
      model.id = { '$ne': model.id }
    }
    const dic = await db.Dictionary.findOne({ where: model });
    if (dic) {
      return res.success(true);
    }
    return res.success(false);

  } catch
    (error) {
    return res.error(error.message);
  }
});

router.post('/mx/exist', async(req, res) => {
  try {
    let model = req.body;
    if (!req.isEmpty(model.id)) {
      model.id = { '$ne': model.id }
    }
    const dic = await db.DictionaryMx.findOne({ where: model });
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
