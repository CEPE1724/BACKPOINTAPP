
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.post('/TerrenaGestionTrabajo/save',controller.save);
router.get('/TerrenaGestionTrabajo/getAll/:idTerrenaGestionTrabajo',controller.getAll);
module.exports = router;