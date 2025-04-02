const express = require('express');
const http = require('http');
const socketIo = require('./ApiCobrador/sockets/socketio');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { initializeDatabase } = require('./ApiCobrador/api/config/database');
const authenticateToken = require('./ApiCobrador/api/auth/authMiddelware'); // Asegúrate de que esta ruta sea correcta
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns'); // Para formatear la fecha

const app = express();
const server = http.createServer(app);
// const io = socketIo.init(server);
socketIo.init(server);

// Middleware para analizar cuerpos de solicitud JSON y URL codificada
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de orígenes permitidos
const allowedOrigins = [process.env.DOMAIN_PRUEBA, process.env.DOMAIN];
app.use(cors({
    origin: '*',
}));

app.use(morgan('dev'));

// Usar Helmet para seguridad
app.use(helmet());

// Limitar la tasa de solicitudes
// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutos
//     max: 100, // Limite de 100 solicitudes por ventana
// });
// app.use('/cobranza/api/v1/point/', apiLimiter);

// Obtener la fecha actual en formato yyyy-MM-dd
//const currentDate = format(new Date(), 'yyyy-MM-dd');
//const logFilePath = path.join(__dirname, 'logs', `${currentDate}.log`);

// Asegurarnos de que el directorio de logs exista
//if (!fs.existsSync(path.dirname(logFilePath))) {
 //   fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
//}

// Crear un flujo de escritura para almacenar los logs en el archivo de log del día
////const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Configura morgan para escribir en un archivo de log por día
///app.use(morgan('combined', { stream: logStream }));

// Rutas sin autenticación (sin middleware)
const publicRoutes = [
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Usuario/router') },
    { path: '/cobranza/api/v1/point/', route: require('./Equifax/api/EQFX_IdentificacionConsultada/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/ProteccionDatos/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Bodega/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/DispositivosAPP/router') },
    { path: '/cobranza/api/v1/point/', route: require('./WebProductos/api/Productos/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/UbicacionesAPP/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/googleApi/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/SolicitudNCListaProductos/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/DocTerrena/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cre_GCTelefono/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/TerrenaGestionDomicilio/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/TerrenaGestionTrabajo/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/GestionDiaria/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/AccionesUbicaciones/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Seteo/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/NotificationUser/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/RecojoAPP/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Notifications/router') },
];

// Rutas protegidas (con middleware)
const protectedRoutes = [
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_GestorDeCobranzas/router') },//
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_EstadosGestion/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_EstadosTipocontacto/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_ResultadoGestion/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_GestionesDeCobranzas/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/ClientesVerificionTerrena/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cob_APPCobrosEfectivo/router') },
  
 
   
];

const publicRoutesWhatsApp = [
    { path: '/v1/whatsapp/point/', route: require('./WhatsApp/CBO_GestorVirtualCobranzas/router') }
];
// rutas de Cognoware

const publicRoutesCognoware = [
    { path: '/v1/cognoware/', route: require('./CognoWare/TransaccionesCognoware/router') },
];

const publicRoutesmassend = [
    {path: '/v1/massend/', route: require('./Massend/api/NotifiacionCuotaPagos/router')},
];

const publicRoutesmassendToken = [
    {path: '/v1/massend/lia/', route: require('./Massend/api/NotifiacionCuotaPagos/router')},
];
// rutas de Equifax
const publicRoutesEquifax = [
    { path: '/v1/equifax/', route: require('./SoapEquifax/wsExpertoPointTech/router') },
];
// rutas de Cuadricula
const publicRoutesCuadricula = [
    { path: '/api/v1/point/', route: require('./CuadriculaHabitacion/Cuadricula/router') },
];

// rutas google cloud
const publicRoutesGoogleCloud = [
    { path: '/v1/googlecloud/', route: require('./GoogleCloud/Latinium/Point/Compra/router') },
];
// Aplica las rutas sin protección
publicRoutes.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas con protección de token
protectedRoutes.forEach(route => {
    app.use(route.path, authenticateToken,  route.route);
});

// Aplica las rutas de Equifax
publicRoutesEquifax.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas de Massend
publicRoutesmassend.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas de Massend Token
publicRoutesmassendToken.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas de Cuadricula
publicRoutesCuadricula.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas de Google Cloud
publicRoutesGoogleCloud.forEach(route => {
    app.use(route.path, route.route);
});
// Inicializa la conexión a la base de datos

// aplica rutas de whatsapp
publicRoutesWhatsApp.forEach(route => {
    app.use(route.path, route.route);
});

// aplica rutas de Cognoware

publicRoutesCognoware.forEach(route => {
    app.use(route.path, route.route);
});

initializeDatabase()
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        // Manejar rutas no encontradas y errores
        app.use((req, res) => res.status(404).json({ message: "Route not found" }));
        app.use((err, req, res) => {
            console.error(err.stack);
            res.status(500).json({ message: "Internal Server Error" });
        });

        // Iniciar el servidor
        const port = process.env.PORT 
        server.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = { app, server };
