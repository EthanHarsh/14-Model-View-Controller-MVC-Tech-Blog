const express = require('express');
const bars = require('express-handlebars');
const catchAsync = require('./utils/catchAsync');
const routes = require('./routes/index');
var session = require('express-session')


const app = express();

app.engine('handlebars', bars({ extname: '.handlebars' }));
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

var sess = {
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {}
}

if (process.env.STATE === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use(routes);


module.exports = app;