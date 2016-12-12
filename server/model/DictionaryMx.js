/**
 * Created by Adam on 2016/7/24.
 */

module.exports = (sequelize, DataTypes) => sequelize.define('dictionaryMx', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    field: 'id'
  },
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  pid: DataTypes.UUID
}, {
  paranoid: true,
  tableName: 'sys_dictionary_mx',
  classMethods: {
    associate: ({ Dictionary, DictionaryMx }) => {
      DictionaryMx.belongsTo(Dictionary)
    }
  }
});
