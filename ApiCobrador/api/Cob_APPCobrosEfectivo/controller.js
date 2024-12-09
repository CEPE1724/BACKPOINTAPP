
const { AppDataSource } = require("../config/database");
const Cob_APPCobrosEfectivoSchema = require('./model'); // Ajusta la ruta según sea necesario

exports.save = async (req, res) => {
    const { idCompra, idCobrador,  Valor, Imagen,Usuario  } = req.body;
    try {
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
        // Crea un objeto que coincida con el esquema
        const registro = {
            idCompra,
            idCobrador,
            Valor,
            Imagen,
            idAnticipo,
            Usuario
        };

        const FechaSistema = new Date();
        registro.FechaSistema = FechaSistema;

        const repository = AppDataSource.getRepository(Cob_APPCobrosEfectivoSchema);
        await repository.save(registro);

        res.json({ message: "Registro insertado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al insertar el registro" });
    }
}
