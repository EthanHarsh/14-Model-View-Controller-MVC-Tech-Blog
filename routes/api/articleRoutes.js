const router = require('express').Router();
const articleController = require('./../../controllers/articleController');

router.get('/', articleController.getAll);

router.post('/', articleController.createNew);

router.get('/page', articleController.getAllPage);

router.get('/topics', articleController.getTopics);

router.get('/featured', articleController.getFeatured);

router.get('/:title', articleController.getArticle);

module.exports = router;