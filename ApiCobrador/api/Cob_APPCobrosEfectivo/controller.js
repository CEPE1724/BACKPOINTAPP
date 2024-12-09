const { AppDataSource } = require("../config/database");
const Cob_APPCobrosEfectivoSchema = require('./model'); // Ajusta la ruta según sea necesario

exports.save = async (req, res) => {
    const { idCompra, idCobrador, Valor, Imagen, Usuario } = req.body;
    
    try {
        // Validaciones de los campos obligatorios
        if(!idCompra)
            return res.status(400).json({ message: "El campo idCompra es obligatorio" });
        if(!idCobrador)
            return res.status(400).json({ message: "El campo idCobrador es obligatorio" });
        if(!Valor)
            return res.status(400).json({ message: "El campo Valor es obligatorio" });
        if(!Imagen)
            return res.status(400).json({ message: "El campo Imagen es obligatorio" });
        if(!idAnticipo)
            return res.status(400).json({ message: "El campo idAnticipo es obligatorio" });
        if(!Usuario)
            return res.status(400).json({ message: "El campo Usuario es obligatorio" });
        
        // Crear objeto de registro
        const registro = {
            idCompra,
            idCobrador,
            Valor,
            Imagen,
            Usuario
        };

        // Obtener la fecha actual
        const FechaSistema = new Date();
        registro.FechaSistema = FechaSistema;

        // Obtener el repositorio
        const repository = AppDataSource.getRepository(Cob_APPCobrosEfectivoSchema);

        // Obtener el número total de registros existentes y generar el siguiente consecutivo
        const count = await repository.count();
        const consecutivo = count + 1;
        const numeroRegistro = `APP-COBRO${consecutivo.toString().padStart(6, '0')}`;

        // Asignar el número consecutivo al campo correspondiente en el registro
        registro.Numero = numeroRegistro;

        // Guardar el registro en la base de datos
        await repository.save(registro);

        // Responder con éxito
        res.json({ message: "Registro insertado correctamente", numeroRegistro });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al insertar el registro" });
    }
}
