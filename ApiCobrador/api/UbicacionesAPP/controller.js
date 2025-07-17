const { AppDataSource } = require("../config/database");
const UbicacionesAPP = require('./model');
const { handleNewLocation } = require('../../sockets/eventHandlers');

exports.location = async (req, res) => {
    const { idUser, latitude, longitude, ICidIngresoCobrador, ICCodigo, Nombre, iTipoPersonal, idUsuario, Empresa, timestamp } = req.body;
    // Validar idUser
    if (!idUser) {
        return res.status(400).json({ message: "idUser es requerido" });
    }

    // Validar latitude
    if (latitude === undefined || typeof latitude !== 'number') {
        return res.status(400).json({ message: "latitude debe ser un número" });
    }

    // Validar longitude
    if (longitude === undefined || typeof longitude !== 'number') {
        return res.status(400).json({ message: "longitude debe ser un número" });
    }


    try {
        // Crear una nueva entidad usando el método create
        const ubicacion = AppDataSource.getRepository(UbicacionesAPP).create({
            idUser,
            latitude,
            longitude,
            ICidIngresoCobrador,
            ICCodigo,
            Nombre,
            iTipoPersonal,
            idUsuario,
            Empresa,
            timestamp

        });

        // Guardar la ubicación en la base de datos
        const savedLocation = await AppDataSource.getRepository(UbicacionesAPP).save(ubicacion);

        // Emitir la nueva ubicación
        handleNewLocation(savedLocation);

        // Responder con información de la ubicación guardada
        res.status(201).json({
            message: "Ubicación guardada correctamente",
            location: savedLocation
        });
    } catch (error) {
        console.error("Error al guardar la ubicación:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

exports.getLocationsByIdUser = async (req, res) => {
    const { idUser } = req.params;
    // Validar idUser
    if (!idUser) {
        return res.status(400).json({ message: "idUser es requerido" });
    }

    try {
        // Obtener todas las ubicaciones por idUser
        const locations = await AppDataSource.getRepository(UbicacionesAPP).find({ idUser });

        // Responder con las ubicaciones encontradas
        res.status(200).json({
            message: "Ubicaciones encontradas",
            locations
        });
    } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};