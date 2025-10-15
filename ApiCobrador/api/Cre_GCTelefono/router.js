
const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/Cre_GCTelefono/all',controller.alllist);
router.post('/Cre_GCTelefono/add',controller.create);
module.exports = router;


