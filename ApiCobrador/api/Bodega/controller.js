const { AppDataSource } = require("../config/database");
const Bodega = require('./model'); // Asegúrate de que 'Bodega' esté bien importado

// Obtener bodegas por los IDs enviados como parámetros en la URL
exports.getBodegasPorIds = async (req, res) => {
    try {
        // Obtener el parámetro 'ids' desde la URL
        const { ids } = req.query; // Recibimos el parámetro como cadena
        
        // Asegúrate de que 'ids' sea un string con formato JSON (por ejemplo, "[29,49]")
        if (!ids || !Array.isArray(JSON.parse(ids))) {
            return res.status(400).json({ message: "Parámetros de ID no válidos." });
        }
        
        // Convertir el parámetro 'ids' a un array (si es una cadena)
        const idsArray = JSON.parse(ids);

        // Consultar las bodegas cuyos ID estén en el array proporcionado y con las condiciones adicionales
        const bodegas = await AppDataSource.getRepository(Bodega)
            .createQueryBuilder("bodega") // Usamos el query builder para más control
            .select(["bodega.Nombre", "bodega.Bodega", "bodega.Codigo"]) // Seleccionamos solo los campos necesarios
            .where("bodega.Bodega IN (:...ids)", { ids: idsArray }) // Usamos IN para los IDs
            .andWhere("bodega.Almacen = :almacen", { almacen: 1 }) // Condición adicional
            .andWhere("bodega.Factura = :factura", { factura: 1 }) // Condición adicional
            .andWhere("bodega.Inventario = :inventario", { inventario: 1 }) // Condición adicional
            .getMany(); // Ejecutamos la consulta

        // Si no se encuentran bodegas, responder con un mensaje adecuado
        if (bodegas.length === 0) {
            return res.status(404).json({ message: "No se encontraron bodegas con esos parámetros." });
        }

        // Enviar la respuesta con las bodegas encontradas
        res.json(bodegas);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
