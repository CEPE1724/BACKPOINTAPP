const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken,


router.post('/Notifications/create', controller.create);
router.get('/Notifications/getAllNot', controller.getAll);
router.get('/Notifications/getId/:idNotifications', controller.getId);
router.get('/Notifications/getBy', controller.getBy);

module.exports = router;