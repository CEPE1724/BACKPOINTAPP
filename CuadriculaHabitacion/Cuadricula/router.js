const express = require('express');
const router = express.Router();
const PointController = require('./controller');
router.get('/:user/:password', PointController.listBDD);
router.get('/list/empresa/:idUsuario', PointController.listEmpresa);
router.get('/list/bddempresa/Greta/:user/:password/:idempresa', PointController.EmpresaUser);
router.get ('/list/empresa/:idUsuario/:idempresa', PointController.listBodegaEmpresa);
router.get('/list/habitaciones/:idBodega/:idempresa', PointController.listHabitaciones);
router.get('/list/guardias/:idempresa', PointController.listGuardias);
router.post('/createHabitacion', PointController.createHabitacion);
module.exports = router;  // Exportamos el router para usarlo en nuestra App
