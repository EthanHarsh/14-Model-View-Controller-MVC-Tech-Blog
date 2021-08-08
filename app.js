const express = require('express');
const bars = require('express-handlebars');
const catchAsync = require('./utils/catchAsync');

const app = express();

app.engine('handlebars', bars());
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});


module.exports = app;