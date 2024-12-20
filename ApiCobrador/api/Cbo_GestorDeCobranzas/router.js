
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/all',authenticateToken,controller.allCbo_GestorCount); /* ruta para obtener las ventas por freelance*/
router.get('/registro',authenticateToken,controller.allCbo_Gestor); /* ruta para obtener las ventas por freelance*/
router.get('/registroindividual',authenticateToken,controller.allCbo_Gestor_idCompra); /* ruta para obtener las ventas por freelance*/
module.exports = router;