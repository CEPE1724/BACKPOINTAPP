const express = require('express');
const router = express.Router();
const pagadosController = require('./controller');
const validateToken = require('./auth'); // Middleware para validar el token

router.post('/clientes', validateToken,pagadosController.InsertarPagados);

module.exports = router;
