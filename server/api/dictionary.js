/**
 * Created by Adam on 2016/7/23.
 */
const router = require('express').Router();
const db = require('../model');
const _ = require('lodash');

router.get('/dicList', async function (req, res) {
  try {
    let filter = new db.Filter(req.query);
    const result = await db.Dictionary.findAndCountAll(filter);
    return res.success(result);
  } catch (error) {
    return res.error(error);
  }
});

router.post('/', async function (req, res) {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.Dictionary.create(model);
    }
    else {
      result = await db.Dictionary.update(model,
        {
          where: {
            id: model.id
          }
        },
        {
          fields: ['name', 'code']
        });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  console.log(id)
  try {
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.Dictionary.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    res.error(error);
  }
});


router.post('/mx', async function (req, res) {
  try {
    const model = req.body;
    if (req.isEmpty(model)) return res.error('缺少参数');
    let result = {};
    if (req.isEmpty(model.id)) {
      result = await db.DictionaryMx.create(model);
    }
    else {
      result = await db.DictionaryMx.update(model,
        {
          where: {
            id: model.id
          }
        },
        {
          fields: ['name', 'code', 'pid', 'dictionaryId']
        });
    }
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

router.delete('/mx/:id', async function (req, res) {
  const id = req.params.id;
  console.log(id)
  try {
    if (req.isEmpty(id)) return res.error('参数不能为空');
    await db.DictionaryMx.destroy({ where: { pid: id } });
    const result = await db.DictionaryMx.destroy({ where: { id: id } });
    return res.success(result);
  } catch (error) {
    res.error(error);
  }
});

router.get('/mxList/:id', async function (req, res) {
  const id = req.params.id;
  try {
    if (req.isEmpty(id)) return res.error('参数不能为空');
    const result = await db.DictionaryMx.findAndCountAll({ where: { dictionaryId: id } });
    return res.success(result);
  } catch (error) {
    res.error(error);
  }
});

router.get('/mxTree', async function (req, res) {

    const query = req.query;
    try {
      if (req.isEmpty(query)) return res.error('参数不能为空');
      //根据CODE查询
      const result = await db.DictionaryMx.findAll({
        include: {
          model: db.Dictionary,
          where: { code: query.code }
        }
      });

      if (result && result.length > 0) {
        //加上key的属性
        let list = result.map((value)=> {
          return { label: value.name, value: value.name, key: value.id, pid: value.pid, id: value.id };
        });

        let targetData = [];
        //转换树格式
        for (let i in list) {
          let currentData = list[i];
          //父节点
          let parentData = _.find(list, { id: currentData['pid'] });
          //如果没有父节点.则为跟节点
          if (!parentData) {
            targetData.push(currentData);
            continue;
          }
          parentData['children'] = parentData['children'] || [];
          parentData['children'].push(currentData);
        }
        return res.success(targetData);
      }
    }
    catch (error) {
      console.log(error);
      res.error(error);
    }
  }
);

router.post('/isDicCodeExist', async function (req, res) {
  try {
    const model = req.body;

    let where = { code: model.code };

    if (!req.isEmpty(model.id)) {
      where.id = { '$ne': model.id }
    }

    //根据CODE查询
    const dic = await db.Dictionary.findOne({
      where: where
    });
    if (dic) {
      return res.success({ isExist: true });
    }
    return res.success({ isExist: false });

  } catch (error) {
    return res.error(error.message);
  }
});

router.post('/isMxCodeExist', async function (req, res) {
  try {
    const model = req.body;

    let where = { code: model.code, dictionaryId: model.dictionaryId };

    if (!req.isEmpty(model.id)) {
      where.id = { '$ne': model.id }
    }
    //根据CODE查询
    const dic = await db.DictionaryMx.findOne({
      where: where
    });
    if (dic) {
      return res.success({ isExist: true });
    }
    return res.success({ isExist: false });

  } catch
    (error) {
    return res.error(error.message);
  }
})
;

module.exports = router;
