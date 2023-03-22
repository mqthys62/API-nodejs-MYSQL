// Importation de DataTypes pour définir les types de données de nos champs
// Importation de Model pour définir notre modèle (classe)
const { DataTypes, Model } = require('sequelize');
// Importation de sequelize pour utiliser l'instance de sequelize
const sequelize = require('../../config/database.config');

// Définir notre modèle (classe)
class User extends Model {};

// Définir les champs de notre modèle
// User.init({ ...données récupérées dans le fichier de migration }, { instanceDeBaseDeDonnees, modelName: 'nomDuModele' });
// On modifie Sequelize.TYPE en DataTypes.TYPE
User.init({
    // Le champ id est une clé primaire, auto-incrémentée et non nulle
    id: {
        type: DataTypes.INTEGER, // INTEGER, STRING, TEXT, BOOLEAN, DATE, etc.
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Le champ username est une chaîne de caractères non nulle et unique
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Le champ email est une chaîne de caractères non nulle et unique
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Le champ firstName est une chaîne de caractères non nulle
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Le champ lastName est une chaîne de caractères non nulle
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Le champ password est une chaîne de caractères non nulle
      password: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      // Le champ isActive est un booléen non nul avec une valeur par défaut à false, il est utilisé pour vérifier si l'utilisateur a vérifié son email
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Le champ emailVerificationCode est une chaîne de caractères non nulle, il est utilisé pour stocker le code de vérification de l'email
      emailVerificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Le champ emailVerificationCodeExpiration est une date non nulle, il est utilisé pour stocker la date d'expiration du code de vérification de l'email
      emailVerificationCodeExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // Le champ accessToken est une chaîne de caractères non nulle, il est utilisé pour stocker le jeton d'accès de l'utilisateur pour lui permettre d'executer des requêtes sur l'API
      accessToken: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      }
}, {
    // On passe l'instance de sequelize à notre modèle
    sequelize,
    // On définit le nom de notre modèle
    modelName: 'User',
    // On définit le nom de la table dans la base de données
    tableName: 'users',
});

module.exports = User;