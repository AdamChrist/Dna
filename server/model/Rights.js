/**
 * Created by haojiachen on 2016/12/8.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('rights', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  code: DataTypes.STRING,
  url: DataTypes.STRING,
  method: DataTypes.ENUM('post', 'get', 'put', 'delete'),
  pid: DataTypes.UUID,
  type: DataTypes.STRING,

}, {
  paranoid: true,
  tableName: 'sys_rights',
  classMethods: {
    associate: ({ Rights, Role, RoleRights }) => {
      Rights.belongsToMany(Role, { through: { model: RoleRights, unique: false }, constraints: false });
    }
  },
  hooks: {
    afterSync: async function () {
      const result = await this.findAll();
      //初始化
      if (result.length === 0) {
        await this.bulkCreate([
          { name: '用户编辑', code: 'USER/UPDATE', url: '/api/user', method: 'put', type: 'disabled' },
          { name: '用户新增', code: 'USER/CREATE', url: '/api/user', method: 'post', type: 'hide' },
          { name: '用户删除', code: 'USER/DEL', url: '/api/user', method: 'delete', type: 'disabled' },
          { name: '用户重置密码', code: 'USER/PWD', url: '/api/user/pwd', method: 'post', type: 'disabled' },
          { name: '用户查询', code: 'USER/QUERY', url: '/api/user/query', method: 'post', type: 'hide' },
          { name: '角色新增', code: 'ROLE/CREATE', url: '/api/role', method: 'post', type: 'hide' },
          { name: '角色编辑', code: 'ROLE/UPDATE', url: '/api/role', method: 'put', type: 'disabled' },
          { name: '角色删除', code: 'ROLE/DEL', url: '/api/role', method: 'delete', type: 'disabled' },
          { name: '角色设置菜单', code: 'ROLE/MENU', url: '/api/role/menu', method: 'post', type: 'disabled' },
          { name: '角色设置权限', code: 'ROLE/RIGHTS', url: '/api/role/rights', method: 'post', type: 'disabled' },
          { name: '菜单新增', code: 'MENU/CREATE', url: '/api/menu', method: 'post', type: 'hide' },
          { name: '菜单修改', code: 'MENU/UPDATE', url: '/api/menu', method: 'put', type: 'disabled' },
          { name: '菜单删除', code: 'MENU/DEL', url: '/api/menu', method: 'delete', type: 'disabled' },
          { name: '权限新增', code: 'RIGHTS/CREATE', url: '/api/rights', method: 'post', type: 'hide' },
          { name: '权限修改', code: 'RIGHTS/UPDATE', url: '/api/rights', method: 'put', type: 'disabled' },
          { name: '权限删除', code: 'RIGHTS/DEL', url: '/api/rights', method: 'delete', type: 'disabled' },
          { name: '数据字典类别新增', code: 'DIC/CREATE', url: '/api/dic', method: 'post', type: 'hide' },
          { name: '数据字典类别修改', code: 'DIC/UPDATE', url: '/api/dic', method: 'put', type: 'hide' },
          { name: '数据字典类别删除', code: 'DIC/DEL', url: '/api/dic', method: 'delete', type: 'hide' },
          { name: '数据字典新增', code: 'DICMX/CREATE', url: '/api/dic/mx', method: 'post', type: 'hide' },
          { name: '数据字典修改', code: 'DICMX/UPDATE', url: '/api/dic/mx', method: 'put', type: 'disabled' },
          { name: '数据字典删除', code: 'DICMX/DEL', url: '/api/dic/mx', method: 'delete', type: 'disabled' },
        ]);
      }
    }
  }
});
