// router.js
const express = require('express');
const router = express.Router();
const CompraEncuestaController = require('./controller');

router.get('/CompraEncuesta/:estado', CompraEncuestaController.getallCompraEncuestas);

module.exports = router;