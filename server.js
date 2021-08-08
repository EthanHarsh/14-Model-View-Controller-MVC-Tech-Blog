require('dotenv').config();
const { Sequelize } = require('sequelize');
const app = require('./app');
const initDb = require('./utils/db_connect');
const checkDbConnection = require('./utils/checkDbConnection');

checkDbConnection();

//START SERVER
const port = process.env.PORT || 4007;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

