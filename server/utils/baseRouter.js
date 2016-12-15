/**
 * Created by haojiachen on 2016/12/8.
 */
const db = require('../model');

/**
 * 增,删,改,查,重复校验的基础路由
 * 增加:POST   - /query
 * 保存:POST   - /
 * 删除:DELETE - /:id
 * @param router  路由
 * @param moduleName  model的名字
 * @returns {*} 基础路由
 */
module.exports = (router, moduleName) => {
  /**
   * 根据条件查询所有数据
   */
  router.post('/query', async(req, res) => {
    try {
      const queryFilter = req.queryFilter(req.body);
      const result = await db[moduleName].findAndCountAll(queryFilter);
      return res.success(result);
    } catch (error) {
      return res.error(error.message);
    }
  });

  /**
   * 新增
   */
  router.post('/', async(req, res) => {
    try {
      const model = req.body;
      if (req.isEmpty(model)) return res.error('缺少参数');
      const result = await db[moduleName].create(model);
      return res.success(result);
    } catch (error) {
      return res.error(error.message);
    }
  });

  /**
   * 修改
   */
  router.put('/', async(req, res) => {
    try {
      const model = req.body;
      if (req.isEmpty(model)) return res.error('缺少参数');
      const result = await db[moduleName].update(model, { where: { id: model.id } }, { fields: Object.keys(model) });
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
      const result = await db[moduleName].destroy({ where: { id: id } });
      return res.success(result);
    } catch (error) {
      return res.error(error.message);
    }
  });

  /**
   * 校验重复
   */
  router.post('/exist', async(req, res) => {
    try {
      let model = req.body;
      if (!req.isEmpty(model.id)) {
        model.id = { '$ne': model.id }
      }
      const result = await db[moduleName].findOne({ where: model });
      return res.success(result !== null);
    } catch
      (error) {
      return res.error(error.message);
    }
  });

  return router;
};

