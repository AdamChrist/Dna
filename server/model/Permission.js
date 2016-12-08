/**
 * Created by haojiachen on 2016/12/8.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('permission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  type: DataTypes.ENUM('menu', 'operation')
}, {
  paranoid: true,
  tableName: 'sys_permission',
  classMethods: {
    associate: ({ Role, Permission, RolePermission, Menu, MenuPermission }) => {
      Permission.belongsToMany(Role, { through: { model: RolePermission, unique: false }, constraints: false })
      Permission.belongsToMany(Menu, { through: { model: MenuPermission, unique: false }, constraints: false })
    }
  }
});
