require('dotenv').config()
const { Sequelize } = require('sequelize');

//Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});
//console.log(sequelize)
module.exports = sequelize;