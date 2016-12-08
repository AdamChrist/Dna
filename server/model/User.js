module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  account: DataTypes.STRING,
  password: DataTypes.STRING,
  mobile: DataTypes.STRING,
  email: DataTypes.STRING,
  name: DataTypes.STRING,
}, {
  paranoid: true,
  tableName: 'sys_user',
  classMethods: {
    associate: ({ User, Role, UserRole }) => {
      User.belongsToMany(Role, { through: { model: UserRole, unique: false }, constraints: false });
    }
  }
});

