const router = require('express').Router();
const userController = require('./../../controllers/userController');

router.get('/', userController.getAll);

router.get('/page', userController.getAllPage);

router.get('/auth', userController.authCheck);

router.post('/auth', userController.auth);

router.get('/auth/logout', userController.logOut);

router.post('/auth/signup', userController.createNew);

module.exports = router;