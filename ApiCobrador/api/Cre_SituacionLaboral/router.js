// router.js
const express = require('express');
const router = express.Router();
const Cre_SituacionLaboralController = require('./controller');

router.get('/Cre_SituacionLaboral/:idEntidadFinanciera', Cre_SituacionLaboralController.getSituacionLaboralByEntidad);

module.exports = router;