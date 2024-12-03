const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authenticateToken = require('../auth/authMiddelware');
//authenticateToken, 
router.get('/SolicitudNCListaProductos/all',controller.all); /* ruta para obtener las ventas por freelance*/
router.get('/SolicitudNCListaProductos/bancos',controller.find); /* ruta para obtener una venta por id*/
router.post('/AppSave/insert',controller.insert); /* ruta para insertar una venta*/
router.post('/AppSave/Deposito', controller.insertDeposito); /* ruta para insertar un deposito*/
router.post('/AppSave/Recojo', controller.insertRecojo); /* ruta para insertar un recojo*/
router.post('/AppSave/Anticipos', controller.insertAnticipos); /* ruta para insertar un recojo detalle*/
router.get('/AppSave/ViewGestionesDeCobranzas', controller.ViewGestionesDeCobranzas); /* ruta para insertar un recojo detalle*/
router.get('/AppSave/TablaAmrtizacion', controller.TablaAmortizacion); /* ruta para insertar un recojo detalle*/
router.get('/AppSave/TablaAmrtizacion', controller.TablaAmortizacion); /* ruta para insertar un recojo detalle*/
router.get('/AppSave/TablaValoresPendientes', controller.TablaAmortizacionValores); /* ruta para insertar un recojo detalle*/
router.get('/Inventario/Productos', controller.Inventario); /* ruta para insertar un recojo detalle*/
module.exports = router;