const { where } = require('sequelize');
const { AppDataSource } = require("../config/database");
const ClientesVerificionTerrena = require('./model');
const socketIO = require('../../sockets/socketio');
const { handleNewVT, handleNewVTCount } = require('../../sockets/eventHandlers');

exports.alllist = async (req, res) => {
    const { idVerificador } = req.query; // Obtener los parámetros de consulta
    const page = parseInt(req.query.page) || 1; // Página actual
    const limit = parseInt(req.query.limit) || 200; // Número de registros por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    try {
        // Usar un enfoque con `where` optimizado por `FechaSistema` u otro campo único
        const [registros, total] = await Promise.all([
            AppDataSource.getRepository(ClientesVerificionTerrena).find({
                where: {
                    idVerificador: idVerificador
                },
                take: limit, // Límite de registros por página
                skip: offset, // Paginación
                order: {
                    FechaSistema: 'DESC' // Ordenar por FechaSistema en orden descendente
                }
            }),
            AppDataSource.getRepository(ClientesVerificionTerrena).count({
                where: {
                    idVerificador: idVerificador
                }
            })
        ]);

        // Emitir la lista a través de un manejador de eventos
        handleNewVT(registros);
        // Enviar los registros junto con el total de registros
        res.json({ registros, total });
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.countEstado = async (req, res) => {
    const { idVerificador } = req.query; // Obtener los parámetros de consulta
    
    try {
        // Obtener el conteo y los estados agrupados
        const estadosCount = await AppDataSource.getRepository(ClientesVerificionTerrena)
            .createQueryBuilder('clientes')
            .select('COUNT(iEstado) AS Count')
            .addSelect('CASE WHEN iEstado = 0 THEN \'PENDIENTE\' WHEN iEstado = 1 THEN \'ENVIADO\' WHEN iEstado = 2 THEN \'ANULADO\' END AS eSTADO')
            .where('idVerificador = :idVerificador', { idVerificador })
            .groupBy('iEstado')
            .getRawMany();
            handleNewVTCount(estadosCount); // Si necesitas emitir esta información, ajusta la función según sea necesario

        res.json(estadosCount);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
