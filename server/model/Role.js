/**
 * Created by haojiachen on 2016/12/5.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: DataTypes.STRING
}, {
  paranoid: true,
  tableName: 'role'
});
