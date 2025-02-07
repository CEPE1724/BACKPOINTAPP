
const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 

router.get('/seteo/all',controller.getAll);

module.exports = router;