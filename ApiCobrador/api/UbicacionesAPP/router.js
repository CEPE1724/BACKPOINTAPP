
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/UbicacionesAPP/location',controller.location); /* ruta para obtener las ventas por freelance*/
router.get('/UbicacionesAPP/idUser/:idUser',controller.getLocationsByIdUser); /* ruta para obtener las ventas por freelance*/
module.exports = router;