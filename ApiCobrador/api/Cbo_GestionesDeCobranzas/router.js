
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');

router.post('/Cbo_GestionesDeCobranzas/insert',controller.insert); /* ruta para obtener las ventas por freelance*/
router.get('/Cbo_GestionesDeCobranzas/getGestionesDeCobranzas',controller.getGestionesDeCobranzas); /* ruta para obtener las ventas por freelance*/
module.exports = router;