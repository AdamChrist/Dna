const moment = require('moment');
module.exports = (sequelize, DataTypes) => sequelize.define('sequences',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    value: DataTypes.INTEGER,
    format: DataTypes.STRING,
    dateFormat: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'sys_sequences',
    classMethods: {
      getNextValue: async(name) => {
        const entity = await Sequences.findOne({ where: { name } });
        const date = moment();
        entity.value++;
        // 重置序列
        if (entity.dateFormat && date.format(entity.dateFormat) > moment(entity.updatedAt).format(entity.dateFormat)) {
          entity.value = 1;
        }
        const no = {
          value: entity.format ? entity.value.toString().padStart(entity.format.length, entity.format) : entity.value,
          separator: '',
          prefix: '',
          prefix_separator: '',
          suffix: '',
          suffix_separator: '',
          dateFormat: entity.dateFormat ? moment().format(entity.dateFormat) : '',
        };
        entity.save();
        return `${no.prefix}${no.prefix_separator}${no.dateFormat}${no.separator}${no.value}${no.suffix_separator}${no.suffix}`;
      }
    }
  });
