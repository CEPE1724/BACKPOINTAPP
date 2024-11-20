
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/GestionDiaria/list',controller.addNew); /* ruta para obtener las ventas por freelance*/
router.get('/GestionDiaria/allGestionId',controller.allGestionId); /* ruta para obtener las ventas por freelance*/
router.get('/GestionDiaria/allGestion',controller.allGestion); /* ruta para obtener las ventas por freelance*/
module.exports = router;