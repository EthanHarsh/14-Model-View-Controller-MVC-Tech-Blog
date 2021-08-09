const router = require('express').Router();

const api = require('./api/index');

router.use('/api/v1', api);

module.exports = router;