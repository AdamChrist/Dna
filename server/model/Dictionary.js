/**
 * Created by Adam on 2016/7/23.
 */
module.exports = (sequelize, DataTypes) => {
  const Dictionary = sequelize.define('dictionary', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      field: 'id'
    },
    code: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING
  }, {
    paranoid: true,
    tableName: 'sys_dictionary'
  });
  return Dictionary;
};
