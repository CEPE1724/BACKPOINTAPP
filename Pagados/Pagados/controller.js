const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const Pagados = require("./model");

exports.InsertarPagados = async (req, res) => {
    try {

        const { Fecha, Estado, Numero, Cedula, Cliente, Monto } = req.body;

        // Validar los datos de entrada
        if (!Fecha || !Estado || !Numero || !Cedula || !Cliente || !Monto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Crear una nueva instancia de Pagados
        const registro ={
            Fecha,
            Estado,
            Numero,
            Cedula,
            Cliente,
            Monto
        };
        // Guardar el registro en la base de datos
        const nuevoRegistro = await AppDataSource.getRepository(Pagados).save(registro);
        return res.status(201).json(nuevoRegistro);
    }

    catch (error) {
        console.error('Error al insertar el registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

