
const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.post('/equifax/insert',controller.allInsert); /* ruta para obtener las ventas por freelance*/
module.exports = router;