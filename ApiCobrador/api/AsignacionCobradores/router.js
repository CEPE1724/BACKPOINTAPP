
const express = require('express');
const router = express.Router();
const controller = require('./controller');
//authenticateToken, 
router.patch('/AsignacionCobradores/jefeVerificador',controller.alllist); /* ruta para obtener las ventas por freelance*/
router.get('/AsignacionCobradores/VerificarSupervisor',controller.searchSupervisor); /* ruta para verificar si el supervisor existe */
router.get('/AsignacionCobradores/CobradoresIdSupervisor',controller.searchJefeidCobrador); /* ruta para verificar si el jefe existe */
router.patch('/AsignacionCobradores/UpdateCobrador',controller.UpdateCobrador); /* ruta para actualizar el jefe de cobrador */
module.exports = router;