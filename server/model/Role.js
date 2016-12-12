/**
 * Created by haojiachen on 2016/12/5.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  remark: DataTypes.STRING
}, {
  paranoid: true,
  tableName: 'sys_role',
  classMethods: {
    associate: ({User, Role, UserRole, Menu, Rights, RoleMenu, RoleRights}) => {
      Role.belongsToMany(User, {through: {model: UserRole, unique: false}, constraints: false});
      Role.belongsToMany(Menu, {through: {model: RoleMenu, unique: false}, constraints: false});
      Role.belongsToMany(Rights, {through: {model: RoleRights, unique: false}, constraints: false});
    }
  }
});

