/**
 * Created by haojiachen on 2016/12/7.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
}, {
  paranoid: true,
  tableName: 'sys_user_role'
});
