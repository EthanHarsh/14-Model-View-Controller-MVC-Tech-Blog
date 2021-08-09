const router = require('express').Router();
const userController = require('./../../controllers/userController');

router.get('/', userController.getAll);

router.post('/', userController.createNew);

router.get('/page', userController.getAllPage);

router.get('/auth', userController.authCheck);

router.post('/auth', userController.auth);

router.delete('/auth', userController.logOut);

module.exports = router;