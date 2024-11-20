// controllers/insertController.js
const { AppDataSource } = require("../config/database");
const Cbo_GestionesDeCobranzasSchema = require('./model'); // Ajusta la ruta según sea necesario

exports.insert = async (req, res) => {
    const { idCompra, idPersonal, Fecha, idCbo_EstadoGestion, idCbo_ResultadoGestion, FechaPago, Valor, Usuario, Notas, idCliente, Tipo, idCbo_EstadosTipocontacto } = req.body;
    try {
        if(!idCompra)
            return res.status(400).json({ message: "El campo idCompra es obligatorio" });
        if(!idPersonal)
            return res.status(400).json({ message: "El campo idPersonal es obligatorio" });
        if(!Fecha)
            return res.status(400).json({ message: "El campo Fecha es obligatorio" });
        if(!idCbo_EstadoGestion)
            return res.status(400).json({ message: "El campo idCbo_EstadoGestion es obligatorio" });
        if(!idCbo_ResultadoGestion)
            return res.status(400).json({ message: "El campo idCbo_ResultadoGestion es obligatorio" });
        if(!FechaPago)
            return res.status(400).json({ message: "El campo FechaPago es obligatorio" });
        if(Valor == null)
            return res.status(400).json({ message: "El campo Valor es obligatorio" });
        if(!Usuario)
            return res.status(400).json({ message: "El campo Usuario es obligatorio" });
        if(!Notas)
            return res.status(400).json({ message: "El campo Notas es obligatorio" });
        if(!idCliente)
            return res.status(400).json({ message: "El campo idCliente es obligatorio" });
        if(!Tipo)
            return res.status(400).json({ message: "El campo Tipo es obligatorio" });
        if(!idCbo_EstadosTipocontacto)
            return res.status(400).json({ message: "El campo idCbo_EstadosTipocontacto es obligatorio" });

        // Convertir fechas a objetos Date y validar que no sean Invalid Date
        const fecha = new Date(Fecha);
        const fechaPago = new Date(FechaPago);

        if (isNaN(fecha.getTime()) || isNaN(fechaPago.getTime())) {
            return res.status(400).json({ message: "Fechas inválidas" });
        }

        // Crea un objeto que coincida con el esquema
        const registro = {
            idCompra,
            idPersonal,
            Fecha: fecha,
            idCbo_EstadoGestion,
            idCbo_ResultadoGestion,
            FechaPago: fechaPago,
            Valor,
            Usuario,
            Notas,
            idCliente,
            Tipo,
            idCbo_EstadosTipocontacto
        };

        const repository = AppDataSource.getRepository(Cbo_GestionesDeCobranzasSchema);
        await repository.save(registro);

        res.json({ message: "Registro insertado correctamente" });
    } catch (error) {
        console.error("Error al insertar registro:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.getGestionesDeCobranzas = async (req, res) => {
    try {
        const registros = await AppDataSource.getRepository(Cbo_GestionesDeCobranzasSchema).find({
            where: {
                idCompra: 551903
            }
        });
        res.json(registros);
    } catch (error) {
        console.error("Error al obtener registros:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
