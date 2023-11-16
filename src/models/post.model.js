const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database.config');

class Post extends Model { };

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  postedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'posts',
});

module.exports = Post;