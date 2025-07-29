const { AppDataSource } = require("../config/database");
const Cre_SituacionLaboral = require('./model'); // Asegúrate de que 'CompraEncuesta' esté bien importado

exports.getSituacionLaboralByEntidad = async (req, res) => {
     
    try {
        // Obtener el parámetro 'idEntidadFinanciera' desde la URL
        const { idEntidadFinanciera } = req.params;
        // Validar el parámetro 'idEntidadFinanciera'
        if (!idEntidadFinanciera || isNaN(idEntidadFinanciera)) {
            return res.status(400).json({ message: "Parámetro de idEntidadFinanciera no válido." });
        }
        // Convertir el parámetro 'idEntidadFinanciera' a un número
        let  entidadId = parseInt(idEntidadFinanciera, 10);
     
      
        // Consultar la situación laboral por entidad financiera
        const situacionLaboral = await AppDataSource.getRepository(Cre_SituacionLaboral)
            .createQueryBuilder("situacionlaboral")
            .select(["situacionlaboral.idSituacionLaboral", "situacionlaboral.Descripcion"])
            .where("situacionlaboral.idEntidadFinanciera = :entidadId", { entidadId })
            .getMany(); // Ejecutamos la consulta

        // Si no se encuentra la situación laboral, responder con un mensaje adecuado
        if (situacionLaboral.length === 0) {
            return res.status(404).json({ message: "No se encontró situación laboral para esa entidad financiera." });
        }
        
        // Enviar la respuesta con la situación laboral encontrada
        res.json(situacionLaboral);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

