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
    require('../ProteccionDatos/model'),
    require('../UsuariosBodegas/model'),
    require('../PermisosMenus/model'),
    require('../Bodega/model'),
    require('../DispositivosAPP/model'),
    require('../Nomina/model'),
    require('../Com_AsignacionDeVendedores/model'),
    require('../Cob_APPCobrosEfectivo/model'),
    require('../Cre_GCTelefono/model'),
    require('../Com_CargosDeVentas/model'),
    require('../Com_Rango/model'),
    require('../AccionesUbicaciones/model'),
    require('../Seteo/model'),
    require('../NotificationGroup/model'),
    require('../NotificationUser/model'),
    require('../Notifications/model'),
    require('../RecojoAPP/model'),


    require('../../../Equifax/api/EQFX_IdentificacionConsultada/model'),
    require('../../../Equifax/api/EQFX_ResultadoSegmentacion/model'),
    require('../../../Equifax/api/EQFX_ResultadoPoliticas/model'),
    require('../../../Equifax/api/EQFX_ScorePuntajeyGraficoV3/model'),
    require('../../../Equifax/api/EQFX_DeudaReportadaINFOCOM/model'),
    require('../../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoSICOM/model'),
    require('../../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoEducativo/model'),
    require('../../../Equifax/api/EQFX_DeudaTotalSICOM/model'),
    require('../../../Equifax/api/EQFX_CuotaEstimadaMensualWeb/model'),
    require('../../../Equifax/api/EQFX_AnalisisSaldosPorVencerSistemaFinanciero/model'),
    require('../../../Equifax/api/EQFX_HistorialCrediticio/model'),
    require('../../../Equifax/api/EQFX_PerfilRiesgoDirecto/model'),
    require('../../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamiento/model'),
    require('../../../Equifax/api/EQFX_AnalisisDetalleVencido/model'),
    require('../../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoRecursivo/model'),
    require('../../../Equifax/api/EQFX_Ultimas10OperacionesCanceladas/model'),
    require('../../../Equifax/api/NivelDetalleDeLaOperacion/EQFX_DetalleOperacion/model'),
    require('../../../Equifax/api/NivelDetalleOperacionesYEntidades/EQFX_RecursivoAnalisisOperacionesDeudaHistorica/model'),
    require('../../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DobleInfo/model'),
    require('../../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DetalleDirecciones/model'),
    require('../../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DetalleTelefonos/model'),
    require('../../../Equifax/api/EQFX_PerfilRiesgoDirectoSeis/model'),
    require('../../../Equifax/api/EntidadesQueConsultaron/model'),
    require('../../../Equifax/api/EQFX_IndicadoresDeudaActualSbsSicomRfr/model'),
    require('../../../Equifax/api/EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores/model'),
    require('../../../Equifax/api/EQFX_DetalleDeudaActualReportadaSBS/model'),
    require('../../../Equifax/api/EQFX_DetalleOperacionesVencidas/model'),
    require('../../../Equifax/api/EQFX_DeudaReportadaRFR/model'),
    require('../../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoRFR/model'),
    require('../../../Equifax/api/EQFX_CalificaDetalleTarjetas/model'),
    require('../../../Equifax/api/EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas/model'),
    require('../../../Equifax/api/EQFX_PersonasInhabilitadasSinProtestos/model'),
    require('../../../Equifax/api/EQFX_CreditosOtorgados12UltimosMesesEducativo/model'),
    require('../../../Equifax/api/EQFX_SujetoAlDiaInfocom/model'),
    require('../../../Equifax/api/EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes/model'),
    require('../../../Equifax/api/EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes/model'),
    require('../../../WebProductos/api/Productos/model'),
    //soap Equifax
    // ruta massend
    require('../../../Massend/api/NotifiacionCuotaPagos/model'),
    //gloogle cloud latinium
    require('../../../GoogleCloud/Latinium/Point/Compra/model'),
    //ruta cognoscorring
    require('../../../CognoWare/TransaccionesCognoware/model'),
    require('../../../CognoWare/TarjetasCognoware/model'),

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
