
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.get('/ClientesVerificionTerrena/list',controller.alllist); /* ruta para obtener las ventas por freelance*/
router.get('/ClientesVerificionTerrena/countEstado',controller.countEstado); /* ruta para obtener las ventas por freelance*/
router.patch('/ClientesVerificionTerrena/update',controller.update); /* ruta para obtener las ventas por freelance*/
module.exports = router;