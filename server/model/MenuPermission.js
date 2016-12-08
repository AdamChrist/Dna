/**
 * Created by haojiachen on 2016/12/8.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('menuPermission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

}, {
  paranoid: true,
  tableName: 'sys_menu_permission'
});
