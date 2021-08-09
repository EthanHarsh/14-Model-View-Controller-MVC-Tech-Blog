const router = require('express').Router();
const catchAsync = require('./../../utils/catchAsync');

router.get('/', catchAsync(async function (req, res) {
    res.render('home');
}));

router.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

router.get('/read', function (req, res) {
    res.render('read');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

module.exports = router