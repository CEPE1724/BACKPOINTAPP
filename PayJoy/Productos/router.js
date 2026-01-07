const express = require("express");
const router = express.Router();
const { getProductos } = require("./controller");


router.get("/productos", getProductos);

module.exports = router;
