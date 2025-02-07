
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/recojo/allComprobante',controller.getAllIDComprobante);

module.exports = router;