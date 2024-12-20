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

];

// Rutas protegidas (con middleware)
const protectedRoutes = [
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_GestorDeCobranzas/router') },//
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_EstadosGestion/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_EstadosTipocontacto/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_ResultadoGestion/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cbo_GestionesDeCobranzas/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/ClientesVerificionTerrena/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/TerrenaGestionDomicilio/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/TerrenaGestionTrabajo/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/GestionDiaria/router') },
    { path: '/cobranza/api/v1/point/', route: require('./ApiCobrador/api/Cob_APPCobrosEfectivo/router') },
 
   
];

// Aplica las rutas sin protección
publicRoutes.forEach(route => {
    app.use(route.path, route.route);
});

// Aplica las rutas con protección de token
protectedRoutes.forEach(route => {
    app.use(route.path, authenticateToken,  route.route);
});

// Inicializa la conexión a la base de datos
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
        const port = process.env.PORT || 3025;
        server.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = { app, server };
