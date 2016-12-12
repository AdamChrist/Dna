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
    associate: ({Rights, Role, RoleRights}) => {
      Rights.belongsToMany(Role, {through: {model: RoleRights, unique: false}, constraints: false});
    }
  }
});
