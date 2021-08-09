const { User } = require('./../models/index');
const becrypt = require('bcrypt');

const { responder, postResponder, updateResponder, deleteResponder } = require('./../utils/responders/index');
const catchAsync = require('../utils/catchAsync');
const { ExpressHandlebars } = require('express-handlebars');

exports.getAll = catchAsync(async (req, res, next) => {
    responder(res, await User.findAll());
})

exports.getAllPage = catchAsync(async (req, res, next) => {
    responder(res, await User.findAndCountAll({
        limit: 25
    }));
})

exports.auth = catchAsync(async (req, res, next) => {
    let user = req.body;
    //console.log(user.password);
    let db_user = await User.findAll({
        where: {
            email: user.email
        },
    })
    if (db_user.length > 0) {
        db_user = db_user[0].dataValues;
        //console.log(db_user);
        becrypt.compare(user.password, db_user.password, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                if (!true) {
                    responder(res, result);
                } else {
                    var hour = 3600000;
                    req.session.cookie.maxAge = 14 * 24 * hour;
                    req.session.loggedIn = true;
                    req.session.username = user.email
                    //console.log(req.session);
                    responder(res, result)
                }
            }
        })
    } else {
        postResponder(res, db_user);
    }
})

exports.authCheck = catchAsync(async (req, res, next) => {
    //console.log(req.session.cookie);
    responder(res, [req.session.cookie.originalMaxAge]);
})

exports.logOut = catchAsync(async (req, res, next) => {
    req.session.destroy();
    deleteResponder(res);
})

exports.createNew = catchAsync(async (req, res, next) => {
    let user = req.body;

    let password = user.password;

    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            User.create(user);
        });
    });
})

