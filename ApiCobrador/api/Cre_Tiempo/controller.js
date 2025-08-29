const { AppDataSource } = require("../config/database");

const Cre_Tiempo = require('./model'); // Asegúrate de que 'Cre_Tiempo' esté bien importado

exports.getTiempoByActivo = async (req, res) => {

      try {
        // Obtener el parámetro 'idEntidadFinanciera' desde la URL
        const { Activo } = req.params;

        // Validar el parámetro 'Activo'
        if (!Activo || isNaN(Activo)) {
            return res.status(400).json({ message: "Parámetro de Activo no válido." });
        }

        // Convertir el parámetro 'Activo' a un número
        let activoId = parseInt(Activo, 10);
        console.log("ID de Activo:", activoId);
        // Consultar el tiempo por activo
        const tiempo = await AppDataSource.getRepository(Cre_Tiempo)
            .createQueryBuilder("tiempo")
            .select(["tiempo.idCre_Tiempo", "tiempo.Descripcion"])
            .where("tiempo.Activo = :activoId", { activoId })
            .getMany(); // Ejecutamos la consulta
        // Si no se encuentra el tiempo, responder con un mensaje adecuado
        if (tiempo.length === 0) {
            return res.status(404).json({ message: "No se encontró tiempo para el activo especificado." });
        }
        // Enviar la respuesta con el tiempo encontrado
        res.json(tiempo);
    }
    catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

