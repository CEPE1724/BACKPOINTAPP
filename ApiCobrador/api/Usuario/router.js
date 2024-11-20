// router.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./controller');

router.post('/login', usuarioController.getVaEmPass);

module.exports = router;
