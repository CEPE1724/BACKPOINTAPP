
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/Protecion-datos',controller.addNew); /* ruta para obtener las ventas por freelance*/

module.exports = router;