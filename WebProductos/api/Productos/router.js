// router.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./controller');

router.post('/v1/productos', usuarioController.AllProductos);

module.exports = router;
