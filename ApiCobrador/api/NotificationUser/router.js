const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 

router.get('/NotificationUser/allID',controller.allID);
router.get('/NotificationUser/count',controller.countUser);
router.post('/NotificationUser/create',controller.create);

module.exports = router;