
 
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/TerrenaGestionDomicilio/save',controller.save); /* ruta para obtener las ventas por freelance*/
router.get('/TerrenaGestionDomicilio/getAll/:idTerrenaGestionDomicilio',controller.getAll);

module.exports = router;