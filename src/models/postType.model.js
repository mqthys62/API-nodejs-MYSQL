const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database.config');

class PostType extends Model { };

PostType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  // On passe l'instance de sequelize à notre modèle
  sequelize,
  // On définit le nom de notre modèle
  modelName: 'PostType',
  // On définit le nom de la table dans la base de données
  tableName: 'posts-types',
});

module.exports = PostType;