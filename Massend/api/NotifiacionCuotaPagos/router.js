// router.js
const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/sms', Controller.getNotifiacionCuotaPagosPorEstado);

module.exports = router;