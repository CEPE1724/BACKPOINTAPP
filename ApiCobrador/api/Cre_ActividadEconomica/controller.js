const { AppDataSource } = require("../config/database");
const Cre_ActividadEconomica = require('./model'); // Asegúrate de que 'CompraEncuesta' esté bien importado

exports.Cre_ActividadEconomicaByEntidad = async (req, res) => {
    try {
        // Obtener el parámetro 'idEntidadFinanciera' desde la URL
        const { idEntidadFinanciera } = req.params;
        // Validar el parámetro 'idEntidadFinanciera'
        if (!idEntidadFinanciera || isNaN(idEntidadFinanciera)) {
            return res.status(400).json({ message: "Parámetro de idEntidadFinanciera no válido." });
        }
        // Convertir el parámetro 'idEntidadFinanciera' a un número
        let entidadId = parseInt(idEntidadFinanciera, 10);
         
        // si es 5 cambiar a 2
         if (entidadId === 5) {
            entidadId = 2;
        }

        console.log("Tipo de entidad financiera (ajustado):", entidadId);
        // Consultar la situación laboral por entidad financiera
        const situacionLaboral = await AppDataSource.getRepository(Cre_ActividadEconomica)
            .createQueryBuilder("situacionlaboral")
            .select(["situacionlaboral.idActEconomica", "situacionlaboral.Nombre"])
            .where("situacionlaboral.Tipo = :entidadId", { entidadId })
            .getMany();

        // Verificar si se encontraron resultados
        if (situacionLaboral.length === 0) {
            return res.status(404).json({ message: "No se encontraron resultados para la entidad financiera especificada." });
        }
        // Devolver los resultados encontrados
        return res.status(200).json(situacionLaboral);
    } catch (error) {
        console.error("Error al obtener la situación laboral por entidad financiera:", error);
        return res.status(500).json({ message: "Error interno del servidor al obtener la situación laboral por entidad financiera." });
    }
};
