// routes/equifaxRoutes.js
const express = require('express');
const router = express.Router();
const equifaxController = require('./controller');

// Ruta para consultar la información de Equifax
router.post('/consultarEquifax', equifaxController.consultarEquifax);

module.exports = router;
