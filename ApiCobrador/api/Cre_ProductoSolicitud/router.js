const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/Cre_ProductoSolicitud', Controller.Cre_ProductoSolicitud);

module.exports = router;