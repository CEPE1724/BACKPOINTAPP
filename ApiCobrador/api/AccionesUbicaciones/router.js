const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/accUbi/insert', controller.postInsertUbi);
module.exports = router;