
const express = require('express');
const router = express.Router();
const { enviarNotificacion } = require('./controller'); 


router.post('/notificar', enviarNotificacion);


module.exports = router;
