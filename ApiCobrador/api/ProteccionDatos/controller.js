const { AppDataSource } = require("../config/database");
const DatosProteccion = require("./model");

exports.addNew = async (req, res) => {
    const { Cedula, Nombre, Apellido, IpWeb, CodigoDactilar } = req.body;

    // Validación de datos (puedes agregar más validaciones según tus necesidades)
    if (!Cedula || !Nombre || !Apellido || !IpWeb) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    console.log("ENTRO AQUI");
    // Inicia una transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
        // Crear un nuevo objeto con los datos recibidos
        const DatosProteccionRepository = queryRunner.manager.getRepository(DatosProteccion);
        const newDatosProteccion = DatosProteccionRepository.create({
            Cedula,
            Nombre,
            Apellido,
            CodigoDactilar,
            IpWeb,
            Fecha: new Date()
        });

        // Guardar en la base de datos dentro de la transacción
        await DatosProteccionRepository.save(newDatosProteccion);

        // Si todo está bien, confirma la transacción
        await queryRunner.commitTransaction();
        res.status(201).json({ message: "Datos de protección guardados correctamente" });

    } catch (error) {
        // Si ocurre un error, realiza un rollback
        await queryRunner.rollbackTransaction();

        console.error("Error al guardar los datos de protección:", error);
        // Si el error es debido a una violación de clave única, o similar, manejarlo apropiadamente
        if (error.code === '23505') {
            return res.status(400).json({ message: "El dato ya existe" });
        }

        // Error genérico de servidor
        res.status(500).json({ message: "Error interno del servidor" });
    } finally {
        // Liberar el queryRunner después de la transacción
        await queryRunner.release();
    }
};
