const { AppDataSource } = require("../config/database");
const Seteo = require('./model');

exports.getAll = async (req, res) => {
    try {
        // Realiza la consulta para obtener todos los registros
        const registros = await AppDataSource.getRepository(Seteo).find();
        
        // Verifica si no se encontraron registros
        if (registros.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron registros"
            });
        }
        const appVersion = registros.length > 0 ? registros[0].AppVersion : null;
        const linkversion = registros.length > 0 ? registros[0].linkVersion : null;
        // Responde con los registros encontrados
        return res.status(200).json({
            success: true,
            message: "Registros obtenidos exitosamente",
            data: registros,
            appVersion: appVersion,
            linkVersion: linkversion
        });
    } catch (error) {
        // Manejo de errores, mostrando el mensaje de error en consola
        console.error("Error al realizar la consulta:", error);

        // Responde con un mensaje de error genérico y código 500
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message // Opcional: Incluye detalles del error si se desea
        });
    }
};
