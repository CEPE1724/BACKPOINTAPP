const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken,

router.get('Notifications/allID', controller.allID);
router.get('/Notifications/count', controller.countUser);
router.post('/Notifications/create', controller.create);

module.exports = router;