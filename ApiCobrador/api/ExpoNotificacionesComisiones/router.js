const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.get('/ExpoNotificaciones/Comisiones',controller.pushComisiones); /* ruta para obtener las comisiones de los cobradores */
module.exports = router;