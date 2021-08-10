const { Article, User } = require('./../models/index');
const readingTime = require('reading-time');

const { responder, postResponder, updateResponder, deleteResponder } = require('./../utils/responders/index');
const catchAsync = require('../utils/catchAsync');


exports.getAll = catchAsync(async (req, res, next) => {
    responder(res, await Article.findAll());
})

exports.getAllPage = catchAsync(async (req, res, next) => {
    responder(res, await Article.findAndCountAll({
        limit: 25
    }));
});

exports.getTopics = catchAsync(async (req, res, next) => {
    responder(res, await Article.findAll({
        limit: 5,
        distinct: 'topic',
        attributes: ['topic']
    }));
})

exports.getFeatured = catchAsync(async (req, res, next) => {
    responder(res, await Article.findAll({
        limit: 5,
        attributes: ['title'],
        where: { featured: true }
    }));
});


exports.createNew = catchAsync(async (req, res, next) => {
    let article = req.body;
    article.stats = JSON.stringify(readingTime(article.content));
    if (article.featured === 'on') {
        article.featured = true;
    } else {
        article.featured = false;
    }
    console.log(article);
    console.log(req.session.username);
    let user_id = await User.findAll({
        where: {
            email: req.session.username
        },
        attributes: ['id']
    })

    article.user_id = user_id[0].dataValues.id;
    await Article.create(article);
    res.redirect('/success')
})

exports.getArticle = catchAsync(async (req, res, next) => {
    let title = req.params.title;
    responder(res, await Article.findAll({
        where: {
            title: title
        },
        include: [
            {
                model: User,
                attributes: { exclude: ["password", "email"] }
            }
        ]
    }))
})