require('dotenv').config();
const { Sequelize } = require('sequelize');
const app = require('./app');
const checkDbConnection = require('./utils/checkDbConnection');

//Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

checkDbConnection(sequelize);

//START SERVER
const port = process.env.PORT || 4007;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

