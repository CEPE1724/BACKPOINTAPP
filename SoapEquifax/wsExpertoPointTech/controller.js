// controllers/equifaxController.js
const equifaxService = require('./services');

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
        const { idEQFX_IdentificacionConsultada, codigoConsulta,countarraydata, countdata, mensajeError } = result;

        console.log('Datos de IdentificacionConsultada:', idEQFX_IdentificacionConsultada, codigoConsulta, countarraydata, countdata, mensajeError);
  
        // Devolver la respuesta al cliente con los datos capturados
        return res.status(200).json({
            success: true,
            message: 'Consulta realizada con éxito',
            data: {
                idEQFX_IdentificacionConsultada,
                codigoConsulta,
                mensajeError,
                'Total Tablas': countdata ,
                'Tablas Guardadas': countarraydata
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
