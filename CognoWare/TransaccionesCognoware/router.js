// ./ApiCobrador/api/Whatsapp/router.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validateToken = require('./auth'); // Middleware para validar el token

// Ruta protegida por el token
router.post('/DataCognoware/all',validateToken, controller.save);
module.exports = router;




