const { where } = require('sequelize');
const { AppDataSource } = require("../config/database");
const Cbo_EstadosGestion = require('./model');

exports.alllist = async (req, res) => {
    try {
        const registros = await AppDataSource.getRepository(Cbo_EstadosGestion).find({
            where: {
                idCbo_EstadoGestion: 9,
                Activo: 1
            }
        });
        res.json(registros);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};