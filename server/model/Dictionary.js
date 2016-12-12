/**
 * Created by Adam on 2016/7/23.
 */
module.exports = (sequelize, DataTypes) => sequelize.define('dictionary', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    field: 'id'
  },
  code: DataTypes.STRING,
  name: DataTypes.STRING
}, {
  paranoid: true,
  tableName: 'sys_dictionary'
});

