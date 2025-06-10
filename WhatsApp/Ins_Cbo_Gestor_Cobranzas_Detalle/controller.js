const { AppDataSource } = require('../../ApiCobrador/api/config/database');
const Cbo_Gestor_Cobranzas_Detalle = require('./model'); // Ajusta la ruta según sea necesario
/*idCompra int, Estado int, Fecha Datetime default getdate(), Notas Varchar(8000), URL Varchar(1000)) **/
exports.save = async (req, res) => {
    const { idCompra, Estado, Notas, URL } = req.body;

    try {
        // Validaciones de los campos obligatorios
        console.log('idCompra:', idCompra);
        if (!idCompra) {
            console.log('idCompra no proporcionado');
            return res.status(400).json({ message: "El campo idCompra es obligatorio" });
        }
        
        if (!Estado) {            
            return res.status(400).json({ message: "El campo Estado es obligatorio" });
        }

        if (!Notas) {
            
            return res.status(400).json({ message: "El campo Notas es obligatorio" });
        }

        
        if (!URL) {
            
            return res.status(400).json({ message: "El campo URL es obligatorio" });
        }


        // Crear objeto de registro
        const registro = {
            idCompra,
            Estado,
            Notas,  
            URL
        };

        // Obtener el repositorio
        const repository = AppDataSource.getRepository(Cbo_Gestor_Cobranzas_Detalle);
        
        // Guardar el registro en la base de datos
        await repository.save(registro);

        // Responder con éxito
        res.json({ message: "Registro insertado correctamente"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al insertar el registro" });
    }
};