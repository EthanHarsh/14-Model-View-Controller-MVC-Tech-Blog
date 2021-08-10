const router = require('express').Router();
const catchAsync = require('./../../utils/catchAsync');

router.get('/', catchAsync(async function (req, res) {
    res.render('home');
}));

router.get('/dashboard', function (req, res) {
    res.render('dashboard');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

router.get('/success', function (req, res) {
    res.render('success');
});

router.get('/:title', function (req, res) {
    let title = req.params.title;
    res.render('read', { title });
});

module.exports = router