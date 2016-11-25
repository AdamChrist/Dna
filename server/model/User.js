module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
  }, {
    tableName: 'sys_user'
  });
  return User;
}
