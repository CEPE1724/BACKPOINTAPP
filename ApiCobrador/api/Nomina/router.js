

const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/Nomina/:idnomina', Controller.getProductoSolicitudByIdNomina);
module.exports = router;