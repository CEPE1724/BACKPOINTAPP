// router.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./controller');

router.post('/login', usuarioController.getVaEmPass);

router.post('/v1/login', usuarioController.getVaEmPassUnikeV1);
router.post('/v1/loginPin', usuarioController.getVaEmPassV1);
router.get('/v1/APPUSER/app', usuarioController.getUserApp);

module.exports = router;
