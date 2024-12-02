// index.js
const express = require('express');
const http = require('http');
const socketIo = require('./ApiCobrador/sockets/socketio');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const {initializeDatabase} = require('./ApiCobrador/api/config/database');

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
//const apiLimiter = rateLimit({
  //  windowMs: 15 * 60 * 1000, // 15 minutos
    //max: 100, // Limite de 100 solicitudes por ventana
//});
//app.use('/cobranza/api/v1/point/', apiLimiter);

// Importar rutas
// Importar rutas
const routes = [
    require('./ApiCobrador/api/Usuario/router'),
    require('./ApiCobrador/api/Cbo_GestorDeCobranzas/router'),
    require('./ApiCobrador/api/Cbo_EstadosGestion/router'),
    require('./ApiCobrador/api/Cbo_EstadosTipocontacto/router'),
    require('./ApiCobrador/api/Cbo_ResultadoGestion/router'),
    require('./ApiCobrador/api/Cbo_GestionesDeCobranzas/router'),
    require('./ApiCobrador/api/ClientesVerificionTerrena/router'),
    require('./ApiCobrador/api/UbicacionesAPP/router'),
    require('./ApiCobrador/api/TerrenaGestionDomicilio/router'),
    require('./ApiCobrador/api/TerrenaGestionTrabajo/router'),
    require('./ApiCobrador/api/googleApi/router'),
    require('./ApiCobrador/api/SolicitudNCListaProductos/router'),
    require('./ApiCobrador/api/GestionDiaria/router'),
    require('./Equifax/api/EQFX_IdentificacionConsultada/router'),
    require('./ApiCobrador/api/ProteccionDatos/router'),
];

// Inicializa la conexión a la base de datos
initializeDatabase()
    .then(() => {
        console.log('Conexión a la base de datos establecida');

        routes.forEach(route => {
            app.use('/cobranza/api/v1/point/', route);
        });

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