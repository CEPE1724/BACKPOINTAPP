const express = require('express');
const router = express.Router();
const liaController = require('./controller');
const validateToken = require('./auth'); // Middleware para validar el token

router.get('/baratazos/Baratazos-WEB-WEP',validateToken , liaController.Baratazos_WEB_WP);
router.get('/ofertas/Ofertas-WEB-WEP', validateToken ,liaController.Ofertas_WEB_WP);
router.get('/productos/Productos-WEB-WEP', validateToken ,liaController.productosWEB_WP);

module.exports = router;

