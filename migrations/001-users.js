'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Créer la table users
    await queryInterface.createTable('users', {
      // Le champ id est une clé primaire, auto-incrémentée et non nulle
      id: {
        type: Sequelize.INTEGER, // INTEGER, STRING, TEXT, BOOLEAN, DATE, etc.
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // Le champ username est une chaîne de caractères non nulle et unique
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // Le champ email est une chaîne de caractères non nulle et unique
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // Le champ firstName est une chaîne de caractères non nulle
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Le champ lastName est une chaîne de caractères non nulle
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Le champ password est une chaîne de caractères non nulle
      password: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      // Le champ isActive est un booléen non nul avec une valeur par défaut à false, il est utilisé pour vérifier si l'utilisateur a vérifié son email
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Le champ emailVerificationCode est une chaîne de caractères non nulle, il est utilisé pour stocker le code de vérification de l'email
      emailVerificationCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Le champ emailVerificationCodeExpiration est une date non nulle, il est utilisé pour stocker la date d'expiration du code de vérification de l'email
      emailVerificationCodeExpiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      // Le champ accessToken est une chaîne de caractères non nulle, il est utilisé pour stocker le jeton d'accès de l'utilisateur pour lui permettre d'executer des requêtes sur l'API
      accessToken: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      // Les champs createdAt et updatedAt sont des dates non nulles, ils sont utilisés pour stocker la date de création et de modification de l'utilisateur
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la table users
    await queryInterface.dropTable('users');
  }
};
