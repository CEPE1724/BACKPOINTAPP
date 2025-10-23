const express = require('express')
const controller = require('./controller')
const multer = require('multer')
const router = express.Router()
const validateToken = require('../auth')

const upload = multer({ storage: multer.memoryStorage() })

router.post(
  '/registrar-solicitud',
  validateToken,
  controller.registrarSolicitudCredito
)

router.post(
  '/cambiar-metodo-pago-lhia',
  validateToken,
  controller.cambiarMetodoPagoLHIA
)

// Nuevo endpoint para dependiente, recibe archivos
router.post(
  '/registrar-dependiente',
  validateToken,
  upload.fields([
    { name: 'cedulaFrente', maxCount: 1 },
    { name: 'cedulaDorso', maxCount: 1 },
    { name: 'fotoRostro', maxCount: 1 }
  ]),
  controller.registrarDependiente
)

router.post(
  '/registrar-independiente',
  validateToken,
  upload.fields([
    { name: 'cedulaFrente', maxCount: 1 },
    { name: 'cedulaDorso', maxCount: 1 },
    { name: 'fotoRostro', maxCount: 1 }
  ]),
  controller.registrarIndependiente
)

module.exports = router
// Rutas de consulta de ubicaciones
router.get('/provincias', validateToken, controller.getProvincias)
router.get('/cantones', validateToken, controller.getCantones) // ?idProvincia=1
router.get('/parroquias', validateToken, controller.getParroquias) // ?idCanton=1
router.get('/barrios', validateToken, controller.getBarrios) // ?idParroquia=1
router.get('/parentescos', validateToken, controller.getParentescos) // Nueva ruta para parentescos
router.get(
  '/actividades-economicas',
  validateToken,
  controller.getActividadesEconomicas
) // Nueva ruta para actividades económicas
router.get(
  '/estado-solicitud-por-cedula',
  validateToken,
  controller.getEstadoSolicitudPorCedula
)
router.get(
  '/webSolicitudes/validar-identificacion',
  validateToken,
  controller.validarIdentificacion
)
