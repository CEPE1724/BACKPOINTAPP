
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.get('/Cob_AppCobrosEfectivo',controller.save); /* ruta para obtener las ventas por freelance*/
module.exports = router;