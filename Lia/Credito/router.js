const express = require("express");
const controller = require("./controller");
const multer = require("multer");
const router = express.Router();
const validateToken = require("../auth");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/registrar-solicitud",
  validateToken,
  controller.registrarSolicitudCredito
);

router.post(
  "/cambiar-metodo-pago-lhia",
  validateToken,
  controller.cambiarMetodoPagoLHIA
);

// Nuevo endpoint para dependiente, recibe archivos
router.post(
  "/registrar-dependiente",
  validateToken,
  upload.fields([
    { name: "cedulaFrente", maxCount: 1 },
    { name: "cedulaDorso", maxCount: 1 },
    { name: "fotoRostro", maxCount: 1 },
  ]),
  controller.registrarDependiente
);

router.post(
  "/registrar-independiente",
  validateToken,
  upload.fields([
    { name: "cedulaFrente", maxCount: 1 },
    { name: "cedulaDorso", maxCount: 1 },
    { name: "fotoRostro", maxCount: 1 },
  ]),
  controller.registrarIndependiente
);

module.exports = router;
// Rutas de consulta de ubicaciones
router.get("/provincias", controller.getProvincias);
router.get("/cantones", controller.getCantones); // ?idProvincia=1
router.get("/parroquias", controller.getParroquias); // ?idCanton=1
router.get("/barrios", controller.getBarrios); // ?idParroquia=1
router.get("/parentescos", controller.getParentescos); // Nueva ruta para parentescos
router.get("/actividades-economicas", controller.getActividadesEconomicas); // Nueva ruta para actividades económicas
