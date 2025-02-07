
const { AppDataSource } = require("../config/database");
const RecojoAPP = require('./model');

exports.getAllIDComprobante = async (req, res) => {
    try {
        // buscar numero de compropbante si existe
        const { Comprobante } = req.query;

        if(!Comprobante){
            return res.status(400).json({
                success: false,
                message: "El campo Comprobante es requerido"
            });
        }

        const registros = await AppDataSource.getRepository(RecojoAPP).find({ where: { Comprobante: Comprobante } });
        // Verifica si no se encontraron registros
        if (registros.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No se encontraron registros",
                count : 0
            });
        }
        // Responde con los registros encontrados
        return res.status(200).json({
            success: true,
            message: "Registros obtenidos exitosamente",
            count: registros.length
        });

    }
    catch (error) {
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
         

    