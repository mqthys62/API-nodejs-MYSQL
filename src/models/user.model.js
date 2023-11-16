const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database.config');

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailVerificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emailVerificationCodeExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      accessToken: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

module.exports = User;