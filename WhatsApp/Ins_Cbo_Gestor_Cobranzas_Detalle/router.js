const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.post('/Ins_Cbo_Gestor_Cobranzas_Detalle/save',controller.save);
module.exports = router;