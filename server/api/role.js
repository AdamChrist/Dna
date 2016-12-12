/**
 * Created by haojiachen on 2016/12/5.
 */
const baseRouter = require('../utils/baseRouter');
const router = require('express').Router();
const db = require('../model');

router.post('/query', async(req, res) => {
  try {
    const queryFilter = req.queryFilter(req.body);
    const result = await db.Role.findAndCountAll({...queryFilter, include: [{model: db.Menu}, {model: db.Rights}]});
    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 角色和菜单关联
 */
router.post('/menu', async(req, res) => {
  try {
    const model = req.body;

    const role = db.Role.build(model);

    const roleMenus = model.menus || [];
    const result = await role.setMenus(roleMenus);

    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

/**
 * 角色和权限关联
 */
router.post('/rights', async(req, res) => {
  try {
    const model = req.body;

    const role = db.Role.build(model);

    const roleRights = model.rights || [];
    const result = await role.setRights(roleRights);

    return res.success(result);
  } catch (error) {
    return res.error(error.message);
  }
});

module.exports = baseRouter(router, 'Role');
