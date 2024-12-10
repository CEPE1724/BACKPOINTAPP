
const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.post('/Terrena/Doc',controller.addNew); /* ruta para obtener las ventas por freelance*/

module.exports = router;