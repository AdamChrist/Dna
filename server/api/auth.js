const router = require('express').Router();
const db = require('../model');
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');
const config = require('../../config/env');
const redis = require('../utils/redis');

//内置管理员账号
const ADMIN_ACCOUNT = config.auth.adminAccount;
const ADMIN_PWD = config.auth.adminPwd;
const ADMIN_ID = config.auth.adminId;
const ADMIN_NAME = config.auth.adminName;

/**
 * 是否是管理员
 * @param model
 * @returns {boolean}
 */
const isAdmin = (model) => {
  return ADMIN_ACCOUNT == model.account && md5(ADMIN_PWD) == model.password;
};

/**
 * 保存token
 * @param id
 * @param expireTime
 * @returns {*}
 */
const saveToken = (id, expireTime) => {
  const token = jwt.sign({
    user: {id},
    expireTime: expireTime || Date.now() + 1000 * 60 * 60 * 24 * 7
  }, config.secret);
  redis.set(id, token, 'EX', 60 * 60 * 24 * 7);
  return token;
};

const getToken = (req) => req.cookies.token || req.headers['x-auth-token'];

/**
 * 获取用户权限相关信息
 * @param userId
 */
const getUserAuth = async(userId) => {

  //如果是管理员登录,获取全部权限
  if (userId === ADMIN_ID) {
    //序列化
    const menus = (await db.Menu.findAll()).map(n => n.toJSON());
    return {
      id: ADMIN_ID,
      name: ADMIN_NAME,
      account: ADMIN_ACCOUNT,
      mobile: '00000000000',
      menus: menus,
      operations: []
    }
  } else {
    //查找用户
    const user = await db.User.findById(userId, {include: [{model: db.Role, include: [db.Menu, db.Operation]}]});
    //用户拥有的菜单
    const userMenus = [], userOperations = [];
    if (user.toJSON()) {
      const roles = user.roles;
      if (roles && roles.length > 0) {
        roles.forEach(n => {
          const menus = n.menus;
          if (menus && menus.length > 0) {
            menus.forEach(m => {
              //过滤重复的菜单
              if (!userMenus.some(p => p.code === m.code)) {
                userMenus.push(m);
              }
            })
          }
        })
      }
      return {
        id: user.id,
        name: user.name,
        account: user.account,
        mobile: user.mobile,
        menus: userMenus,
        operations: userOperations
      };
    }
  }
  return null;
};
/**
 * 登录
 */
router.post('/login', async function (req, res, next) {
    let expireTime;
    const model = req.body;
    if (req.isEmpty(model)) return res.error('账户名或密码不能为空！');
    //过期时间
    expireTime = Date.now() + 1000 * 60 * 60 * 24 * 7;
    //如果是超级管理员登录
    if (isAdmin(model)) {
      let token = saveToken(ADMIN_ID);
      //设置cookie
      res.cookie('token', token, {expires: new Date(expireTime), httpOnly: true});
      return res.success({name: ADMIN_NAME});
    }

    try {
      //查找用户
      const user = await db.User.findOne({where: {account: model.account}});

      if (user && user.password == model.password) {
        //保存token
        const token = saveToken(user.id);
        //设置cookie
        res.cookie('token', token, {expires: new Date(expireTime), httpOnly: true});
        //返回token
        return res.success(user);
      }
    } catch (error) {
      return res.error(error.message);
    }
    return res.error('账户名或密码错误!');
  }
);


/**
 * 验证token有效性
 */
router.post('/checkToken', async(req, res, next) => {
  // 获取token
  const token = getToken(req);
  if (token) {
    // 验证token是否过期
    const decoded = jwt.verify(token, config.secret);
    const user = decoded.user;
    const userId = user.id;
    const expireTime = decoded.expireTime;
    // 如果已过期,返回401
    if (Date.now() >= expireTime) {
      console.log('如果已过期,返回401')
      // 删除 token
      await redis.del(userId);
    } else {
      const result = await redis.get(userId);
      if (result === token) {
        return res.success(true);
      }
    }
  }
  res.clearCookie('token');
  return res.success(false);
});


/**
 * 登出
 */
router.post('/logout', async(req, res) => {
  // 获取token
  const token = getToken(req);
  if (token) {
    const decoded = jwt.verify(token, config.secret);
    if (decoded) {
      const {id} = decoded.user;
      // 验证token是否存在
      const result = await redis.get(id);
      if (result === token) {
        redis.del(id);
        res.clearCookie('token');
        return res.success('', '成功登出!');
      }
    }
  }
  res.error('权限已经失效!');
});

/**
 * 获取对应的权限菜单
 */
router.get('/user', async(req, res) => {
  if (req.isEmpty(req.user)) return res.error('获取用户信息失败，请先登录！');

  const userId = req.user.id;

  //获取用户的权限
  const userAuth = await getUserAuth(userId);
  if (userAuth) {
    //缓存到redis中
    redis.set(`auth-${userAuth.id}`, JSON.stringify(userAuth), 'EX', 60 * 60 * 24 * 7);
    return res.success(userAuth);
  }

  return res.error('获取用户信息失败!')
});

//
//
// router.post('/changepwd', async function (req, res) {
//   try {
//     if (req.isEmpty(req.body)) return res.error('修改用户密码失败，缺少参数');
//     // 根据登录信息，获取用户ID
//     let pwd = req.body.pwd;
//     let newPwd = req.body.newPwd;
//     // 修改密码
//     const user = await db.User.findOne({ where: { id: req.user.id, password: pwd } });
//     if (user) {
//       user.password = newPwd;
//       user.save();
//       res.success(user, '修改密码成功!');
//     } else {
//       res.error("旧密码输入错误!")
//     }
//   }
//   catch (error) {
//     res.error(error.message);
//   }
//
// })
//
// router.get('/userInfo', async function (req, res) {
//   try {
//     console.log('xxxxx', req.user);
//     if (req.isEmpty(req.user)) return res.error('获取用户信息失败，请先登录！');
//     // 获取登录信息
//     if (req.user.id === ADMIN_ID) return res.success({ account: ADMIN_ACCOUNT })
//     const result = await db.User.findOne({ where: { id: req.user.id } });
//     return res.success(result);
//   } catch (error) {
//     return res.error(error.message);
//   }
// })
//
//
// /**
//  * @date 13/04/2016
//  * @author liangwenwei
//  */
// router.post('/userInfo', async function (req, res) {
//   try {
//     const model = req.body;
//     const result = await db.User.update(model,
//       {
//         where: {
//           id: model.id
//         }
//       },
//       {
//         fields: ['account', 'mobile', 'email']
//       });
//     return res.success(result);
//   } catch (error) {
//     return res.error(error.message);
//   }
// })

module.exports = router;
