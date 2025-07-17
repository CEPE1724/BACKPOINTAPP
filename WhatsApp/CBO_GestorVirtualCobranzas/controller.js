const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const { body, validationResult } = require('express-validator');

exports.all = async (req, res) => {
    try {
        const { idCompra, idMotivo } = req.query;

        // Ejecutar la consulta
        const result = await AppDataSource.query(
            `EXEC CBO_GestorVirtualCobranzas`
        );

        // Si no se encontraron resultados
        if (result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron resultados',
                data: null,
                totalRecords: 0  // Agregamos el conteo de registros encontrados
            });
        }
        // Si se encontraron resultados
        return res.status(200).json({
            status: 'success',
            message: 'Consulta ejecutada exitosamente',
            data: result,
            totalRecords: result.length  // Contamos la cantidad de registros devueltos
        });
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        return res.status(500).json({
            status: 'error',
            message: 'Error al ejecutar el procedimiento almacenado',
            data: null,
            totalRecords: 0
        });
    }
};
