
const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.get('/DispositivosAPP/Val',controller.alllist); 
router.post('/DispositivosAPP/ValEmai',controller.UpdateEstado);
router.patch('/DispositivosAPP/UpdateTokenExpo',controller.UpdateTokenExpo);
module.exports = router;