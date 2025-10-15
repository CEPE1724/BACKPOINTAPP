const { AppDataSource } = require("../config/database");
const Cre_GCTelefono = require('./model');

exports.alllist = async (req, res) => {
    const  { idCliente } = req.query;
    if (!idCliente) {
        return res.status(400).json({ message: "Faltan parámetros." });
    }
    try {
        const Cre_GCTelefonoRepository = AppDataSource.getRepository(Cre_GCTelefono);
        // Utilizamos el queryBuilder para realizar una consulta
        const result = await Cre_GCTelefonoRepository.createQueryBuilder('c')
            .where('c.idCliente = :idCliente', { idCliente })
            .getMany();  // Obtener todos los registros que coincidan

        res.json(result); // Envía la respuesta JSON con los resultados

    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


exports.create = async (req, res) => {
 
  const { idCliente, Telefono, Descripcion } = req.body;
   
    try {
         
        const Cre_GCTelefonoRepository = AppDataSource.getRepository(Cre_GCTelefono);
        const newCre_GCTelefono = Cre_GCTelefonoRepository.create({ idCliente, Telefono, Descripcion });
        await Cre_GCTelefonoRepository.save(newCre_GCTelefono);

        res.json(newCre_GCTelefono);
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
