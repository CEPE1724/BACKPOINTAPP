const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken,


router.post('/Notifications/create', controller.create);
router.get('/Notifications/getAllNot', controller.getAll);

module.exports = router;