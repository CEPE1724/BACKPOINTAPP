const express = require("express");
const router = express.Router();
const {  postTransacciones } = require("./controller");


// POST - Recibir transacciones desde PayJoy
router.post("/incoming", postTransacciones);

module.exports = router;
