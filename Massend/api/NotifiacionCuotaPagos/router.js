// router.js
const express = require('express');
const router = express.Router();
const Controller = require('./controller');
const validateToken = require('./auth'); // Middleware para validar el token


router.get('/sms', Controller.getNotifiacionCuotaPagosPorEstado);

router.get('/sms/authorization', validateToken,Controller.getNotifiacionCuotaPagosPorEstado);


module.exports = router;



