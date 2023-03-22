const Sequelize = require('sequelize');
const config = require('./config').development;

const sequelize = new Sequelize({
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    dialect: config.dialect,
    port: config.port,
});

module.exports = sequelize;