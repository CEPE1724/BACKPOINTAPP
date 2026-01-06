const express = require('express')
const router = express.Router()
const compraController = require('./controller')
const validateToken = require('../auth')

router.post(
  '/compras/compras-por-ruc',
  validateToken,
  compraController.Compras_Por_Ruc
)
router.post(
  '/compras/compra-por-idCompra',
  validateToken,
  compraController.Compra_Por_idCompra
)
router.post(
  '/compras/compra-por-idCompra-y-ruc',
  validateToken,
  compraController.Compra_Por_Ruc_IdCompra
)
router.post(
  '/compras/factura-por-idCompra',
  validateToken,
  compraController.Factura_Por_idCompra
)

module.exports = router
