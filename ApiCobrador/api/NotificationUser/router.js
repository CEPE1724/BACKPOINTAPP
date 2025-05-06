const express = require('express');
const router = express.Router();
const controller = require('./controller');

//authenticateToken, 
console.log('NotificationUser router loaded');
router.get('/NotificationUser/allID',controller.allID);
router.get('/NotificationUser/count',controller.countUser);
router.post('/NotificationUser/create',controller.create);


router.get('/NotificationUser/allID/notificacion',controller.allIDNotification);
router.get('/NotificationUser/count/notificacion',controller.countUserNotificacion);
router.post('/NotificationUser/create/notificacion',controller.createNotificacion);

router.post('/NotificationUser/expo',controller.sendNotification);

module.exports = router;