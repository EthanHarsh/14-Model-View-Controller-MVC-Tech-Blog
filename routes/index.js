const router = require('express').Router();

const api = require('./api/index');
const front = require('./front/index')

router.use('/api/v1', api);
router.use('/', front)

module.exports = router;