

const { AppDataSource } = require("../config/database");
const CompraEncuesta = require('./model'); // Asegúrate de que 'CompraEncuesta' esté bien importado

// Obtener todas las encuestas de compra
exports.getallCompraEncuestas = async (req, res) => {
    try {
        // Obtener el parámetro 'estado' desde la URL
        const { estado } = req.params;
        // Validar el parámetro 'estado'
        if (!estado || isNaN(estado)) {
            return res.status(400).json({ message: "Parámetro de estado no válido." });
        }
        // Convertir el parámetro 'estado' a un número
        const estadoNumber = parseInt(estado, 10);

        // Consultar todas las encuestas de compra
        const compraEncuestas = await AppDataSource.getRepository(CompraEncuesta)
            .createQueryBuilder("compraencuesta")
            .select(["compraencuesta.idCompraEncuesta", "compraencuesta.Descripcion"])
            .where("compraencuesta.Estado = :estado", { estado: estadoNumber })
            .getMany(); // Ejecutamos la consulta
        // Si no se encuentran encuestas, responder con un mensaje adecuado
        if (compraEncuestas.length === 0) {
            return res.status(404).json({ message: "No se encontraron encuestas de compra con ese estado." });
        }
        // Enviar la respuesta con las encuestas encontradas
        res.json(compraEncuestas);
    }
    catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}



     
