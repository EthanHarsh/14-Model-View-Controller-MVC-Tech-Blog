const { User } = require('./../models/index');
const bcrypt = require('bcrypt');

const { responder } = require('./../utils/responders/index');
const catchAsync = require('../utils/catchAsync');


exports.getAll = catchAsync(async (req, res, next) => {
    responder(res, await User.findAll({
        attributes: { exclude: ["password", "email"] }
    }));
})

exports.getAllPage = catchAsync(async (req, res, next) => {
    responder(res, await User.findAndCountAll({
        limit: 25,
        attributes: { exclude: ["password", "email"] }
    }));
})

exports.auth = catchAsync(async (req, res, next) => {
    let user = req.body;
    console.log('user=s')
    console.log(user);
    let db_user = await User.findAll({
        where: {
            email: user.email
        },
    })
    if (db_user.length > 0) {
        db_user = db_user[0].dataValues;
        bcrypt.compare(user.password, db_user.password, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (!true) {
                    res.redirect('/login');
                } else {
                    var hour = 3600000;
                    req.session.cookie.maxAge = 14 * 24 * hour;
                    req.session.loggedIn = true;
                    req.session.username = user.email
                    res.redirect('/');

                }
            }
        })
    } else {
        res.redirect('/login');
    }
})

exports.authCheck = catchAsync(async (req, res, next) => {
    responder(res, [req.session.cookie.originalMaxAge]);
})

exports.logOut = catchAsync(async (req, res, next) => {
    console.log('logout')
    req.session.destroy();
    res.redirect('/')
})

exports.createNew = catchAsync(async (req, res, next) => {
    let user = req.body;
    let password = user.password;

    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            let resu = User.create(user);
            var hour = 3600000;
            req.session.cookie.maxAge = 14 * 24 * hour;
            req.session.loggedIn = true;
            req.session.username = user.email
            res.redirect('/');
        });
    });
})

