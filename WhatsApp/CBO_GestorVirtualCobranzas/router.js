// ./ApiCobrador/api/Whatsapp/router.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validateToken = require('./auth'); // Middleware para validar el token

// Ruta protegida por el token
router.get('/GestorVirtualCobranzas/all',validateToken, controller.all);

module.exports = router;
