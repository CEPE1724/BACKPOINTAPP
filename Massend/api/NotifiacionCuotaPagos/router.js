// router.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validateToken = require('../auth');


router.get('/sms', controller.getNotifiacionCuotaPagosPorEstado);

router.post('/lia/sms/authorization',validateToken, controller.generateOtp);


module.exports = router;



