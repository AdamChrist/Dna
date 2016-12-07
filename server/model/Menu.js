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
  tableName: 'sys_menu'
});
