
const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/Cre_Tiempo/:Activo', Controller.getTiempoByActivo);
module.exports = router;