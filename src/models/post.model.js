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
  postType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // On passe l'instance de sequelize à notre modèle
  sequelize,
  // On définit le nom de notre modèle
  modelName: 'Post',
  // On définit le nom de la table dans la base de données
  tableName: 'posts',
});

module.exports = Post;