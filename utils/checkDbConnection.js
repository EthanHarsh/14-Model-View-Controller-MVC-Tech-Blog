const catchAsync = require("./catchAsync");
const sequelize = require("./db_connect");

module.exports = catchAsync(async () => {
    //Check connection
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});