const express = require('express')
const router = express.Router()
const liaController = require('./controller')
const validateToken = require('../auth') // Middleware para validar el token

router.get(
  '/baratazos/Baratazos-WEB-LHIA',
  validateToken,
  liaController.Baratazos_WEB_LHIA
)
router.get(
  '/ofertas/Ofertas-WEB-LHIA',
  validateToken,
  liaController.Ofertas_WEB_LHIA
)
router.get(
  '/productos/Productos-WEB-LHIA',
  validateToken,
  liaController.Productos_WEB_LHIA
)
router.post(
  '/carrito/AgregaDetalle-WEB-LHIA',
  validateToken,
  liaController.CarritoAgregarDetalle
)
router.patch(
  '/carrito/ReduceDetalle-WEB-LHIA',
  validateToken,
  liaController.CarritoReducirDetalle
)

router.get(
  '/carrito/ObtenerCarrito-WEB-LHIA/:idWEB_Carrito',
  validateToken,
  liaController.CarritoObtenerCompleto
)

// Nueva ruta para aplicar cupón al carrito
router.post(
  '/carrito/AplicarCupon-WEB-LHIA',
  validateToken,
  liaController.AgregarCuponCarrito
)

module.exports = router
