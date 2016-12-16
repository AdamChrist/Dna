/**
 * Created by haojiachen on 2016/12/7.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  code: DataTypes.STRING,
  url: DataTypes.STRING,
  pid: DataTypes.UUID,
  icon: DataTypes.STRING,
  sortNo: DataTypes.INTEGER,
}, {
  paranoid: true,
  tableName: 'sys_menu',
  classMethods: {
    associate: ({ Menu, Role, RoleMenu }) => {
      Menu.belongsToMany(Role, { through: { model: RoleMenu, unique: false }, constraints: false })
    }
  },
  hooks: {
    afterSync: async function () {
      const menus = await this.findAll();
      //初始化菜单
      if (menus.length === 0) {
        const sysMenu = await this.create({ name: '系统管理', code: 'sys', url: '', pid: '', icon: 'laptop', sortNo: 0 });
        const pid = sysMenu.id;
        await this.bulkCreate([
          { name: '用户管理', code: 'user', url: '/app/user', pid: pid, icon: '', sortNo: 0 },
          { name: '角色管理', code: 'role', url: '/app/role', pid: pid, icon: '', sortNo: 1 },
          { name: '菜单管理', code: 'menu', url: '/app/menu', pid: pid, icon: '', sortNo: 2 },
          { name: '权限管理', code: 'rights', url: '/app/rights', pid: pid, icon: '', sortNo: 3 },
          { name: '数据字典', code: 'dic', url: '/app/dic', pid: pid, icon: '', sortNo: 4 },
        ]);
      }
    }
  }
});
