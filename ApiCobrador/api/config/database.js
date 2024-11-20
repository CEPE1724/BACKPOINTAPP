require('dotenv').config();
const { DataSource } = require('typeorm');

// Importar los esquemas
const entities = [
    require('../Usuario/model'), 
    require('../IngresoCobrador/model'), 
    require('../Cbo_GestorDeCobranzas/model'), 
    require('../Cbo_EstadosGestion/model'), 
    require('../Cbo_EstadosTipocontacto/model'), 
    require('../Cbo_ResultadoGestion/model'), 
    require('../Cbo_GestionesDeCobranzas/model'), 
    require('../ClientesVerificionTerrena/model'),
    require('../UbicacionesAPP/model'),
    require('../TerrenaGestionDomicilio/model'),
    require('../TerrenaGestionTrabajo/model'),
    require('../GestionDiaria/model'),
];

const AppDataSource = new DataSource({
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities, // Usar la variable de entidades
    synchronize: false,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
        connectionTimeout: parseInt(process.env.SQLSERVER_CONNECTION_TIMEOUT, 10),
        requestTimeout: parseInt(process.env.SQLSERVER_REQUEST_TIMEOUT, 10),
    },
});

// Función para inicializar la conexión y manejar errores
const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Salir si no se puede conectar
    }
};

module.exports = {
    AppDataSource,
    initializeDatabase,
};
