const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/Cre_ActividadEconomica/:idEntidadFinanciera', Controller.Cre_ActividadEconomicaByEntidad);
module.exports = router;