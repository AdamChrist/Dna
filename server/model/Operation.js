/**
 * Created by haojiachen on 2016/12/8.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('operation', {
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
  tableName: 'sys_operation',
  classMethods: {
    associate: ({ Operation, Permission, OperationPermission }) => {
      Operation.belongsToMany(Permission, { through: { model: OperationPermission, unique: false }, constraints: false });
    }
  }
});
