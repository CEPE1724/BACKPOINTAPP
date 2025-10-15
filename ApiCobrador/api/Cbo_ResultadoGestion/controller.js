const { where } = require('sequelize');
const { AppDataSource } = require("../config/database");
const Cbo_ResultadoGestion = require('./model');
const { handleNewList } = require('../../sockets/eventHandlers'); // Asumiendo que tienes un manejador para emitir datos

exports.alllist = async (req, res) => {
    const { idCbo_EstadoGestion } = req.query;

    // Validar el parámetro de entrada
    if (!idCbo_EstadoGestion) {
        return res.status(400).json({ message: "El parámetro idCbo_EstadoGestion es requerido." });
    }

    try {
        const registros = await AppDataSource.getRepository(Cbo_ResultadoGestion).find({
            where: {
                idCbo_EstadosTipocontacto: idCbo_EstadoGestion
            }
        });

        res.json(registros);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
