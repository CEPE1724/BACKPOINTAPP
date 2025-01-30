// router.js
const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/point', Controller.getAll);

module.exports = router;