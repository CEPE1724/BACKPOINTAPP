// router.js
const express = require('express');
const router = express.Router();
const BodegaController = require('./controller');

router.get('/BodegaUsuario', BodegaController.getBodegasPorIds);

module.exports = router;