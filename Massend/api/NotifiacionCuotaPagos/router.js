// router.js
const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const validateToken = require('../auth');


router.get('/sms', Controller.getNotifiacionCuotaPagosPorEstado);

router.post('/sms/authorization',validateToken, Controller.generateOtp);


module.exports = router;



