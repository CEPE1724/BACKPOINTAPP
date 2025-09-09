// ./ApiCobrador/api/Whatsapp/router.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validateToken = require('./Token/auth');  // Asegúrate de importar el middleware

// Ruta protegida por el token
router.post('/oauth', controller.equifaxOauth);
module.exports = router;

