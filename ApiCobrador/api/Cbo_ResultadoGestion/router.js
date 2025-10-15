
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.get('/Cbo_ResultadoGestion/list',controller.alllist); /* ruta para obtener las ventas por freelance*/
module.exports = router;