const express = require('express');
const catchAsync = require('./utils/catchAsync');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


module.exports = app;