const { where } = require('sequelize');
const { AppDataSource } = require("../config/database");
const Cbo_EstadosTipocontacto = require('./model');

exports.alllist = async (req, res) => {
    const { idCbo_EstadoGestion } = req.query;
    try {
        const registros = await AppDataSource.getRepository(Cbo_EstadosTipocontacto).find({
            where: {
                idCbo_EstadoGestion: idCbo_EstadoGestion
            }
        });
        res.json(registros);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};