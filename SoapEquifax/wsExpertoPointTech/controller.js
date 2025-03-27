// controllers/equifaxController.js
const equifaxService = require('./services');
const consultarDireccionesYTelefonos = require('./ObtenerNivelDireccionesyTelefonos');
const consultarOperacionesDeudaHistorica = require('./ObtenerNivelOperacionesYEntidades');
const consultarNivelDetalleDeLaOperacion = require('./NivelDetalleDLOperacion');
exports.consultarEquifax = async (req, res) => {
    try {
        const { tipoDocumento, numeroDocumento } = req.body;

        // Validar parámetros requeridos
        if (!tipoDocumento || !numeroDocumento) {
            return res.status(400).send('Faltan parámetros: tipoDocumento y numeroDocumento son requeridos.');
        }

        // Llamar al servicio que hace la solicitud SOAP
        const result = await equifaxService.consultarExpertoPointTech(tipoDocumento, numeroDocumento);
        
        // Capturar los valores de la respuesta
        const { idEQFX_IdentificacionConsultada, codigoConsulta, countarraydata, countdata, mensajeError } = result;
        
        let resultDireccionesTelefonos = {
            countDataDYT: 0, // Inicializamos para evitar undefined
            countIfdataDYT: 0
        };

        let resultOperacionesDeudaHistorica = {
            countIfdataOYE : 0,
            countOYE : 0
        };

        let resultNivelDetalleDeLaOperacion = {
            countIfdataDLOR : 0,
            countDataDLOR : 0
        };

        // Verificar si la consulta fue exitosa y si tenemos el código de consulta
        if (codigoConsulta) {
            try {
    
               resultDireccionesTelefonos = await consultarDireccionesYTelefonos.consultarDireccionesYTelefonos(
                    idEQFX_IdentificacionConsultada,
                    codigoConsulta,
                    tipoDocumento,
                    numeroDocumento
                );
            
                resultOperacionesDeudaHistorica = await consultarOperacionesDeudaHistorica.consultarOperacionesDeudaHistorica(
                    idEQFX_IdentificacionConsultada,
                    codigoConsulta,
                    tipoDocumento,
                    numeroDocumento
                );

                resultNivelDetalleDeLaOperacion = await consultarNivelDetalleDeLaOperacion.consultarNivelDetalleDeLaOperacion(
                    idEQFX_IdentificacionConsultada,
                    codigoConsulta,
                    tipoDocumento,
                    numeroDocumento
                );
                console.log('Direcciones y Teléfonos:', resultDireccionesTelefonos);
            } catch (err) {
                console.error('Error al consultar direcciones y teléfonos:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener direcciones y teléfonos',
                    details: err.message || 'No se pudo obtener la información de direcciones y teléfonos.'
                });
            }
        } else {
            console.warn('No se proporcionó un código de consulta válido.');
        }

        // Verificar que las variables de respuesta existan y estén correctamente formateadas
        const { countIfdataDYT, countDataDYT } = resultDireccionesTelefonos;
        const { countIfdataOYE, countOYE } = resultOperacionesDeudaHistorica;
        const { countIfdataDLOR, countDataDLOR } = resultNivelDetalleDeLaOperacion;
        
        // Devolver la respuesta al cliente con los datos capturados
        return res.status(200).json({
            success: true,
            message: 'Consulta realizada con éxito',
            data: {
                idEQFX_IdentificacionConsultada,
                codigoConsulta,
                mensajeError,
                'Total Tablas': countdata || 0, // Asegurarnos de que countdata no sea undefined
                'Tablas Guardadas': countarraydata || 0 // Asegurarnos de que countarraydata no sea undefined
            },
            dataDireccionesTelefonos: {
                'Total Tablas': countDataDYT || 0, // Asegurarnos de que countDataFromTelefonos no sea undefined
                'Tablas Guardadas': countIfdataDYT || 0 // Asegurarnos de que countIfdataDYT no sea undefined
            },
            dataOperacionesDeudaHistorica: {
                'Total Tablas': countOYE || 0, // Asegurarnos de que countOYE no sea undefined
                'Tablas Guardadas': countIfdataOYE || 0 // Asegurarnos de que countIfdataOYE no sea undefined
            },
            dataNivelDetalleDeLaOperacion: {
                'Total Tablas': countDataDLOR || 0, // Asegurarnos de que countDataDLOR no sea undefined
                'Tablas Guardadas': countIfdataDLOR || 0 // Asegurarnos de que countIfdataDLOR no sea undefined
            },
            details: 'La información fue obtenida correctamente desde Equifax.'
        });

    } catch (error) {
        console.error('Error en el controlador:', error);

        // Devolver un mensaje de error detallado en caso de fallo
        return res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud SOAP',
            details: error.message || 'No se pudo procesar la solicitud debido a un error interno.'
        });
    }
};
