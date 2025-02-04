const { AppDataSource } = require("../config/database"); // Asegúrate de que AppDataSource está correctamente configurado
const AccionesUbicaciones = require('./model'); // Importa tu modelo

exports.postInsertUbi = async (req, res) => {
    const { 
        idAccion, 
        tipoAccion, 
        latitude, 
        longitude, 
        ICidIngresoCobrador, 
        Empresa, 
        idCompra, 
        idCombo1, 
        idCombo2, 
        idCombo3, 
        TipoPago,
        FechaPago,
        IdBanco,
        NumeroDeposito,
        Url,
        Valor ,
        Offline,
        timestamp,
        Notas
    } = req.body;

    console.log("Datos recibidos:", req.body);
    // Verifica que los parámetros esenciales estén presentes
    if (!tipoAccion || !latitude || !longitude || !ICidIngresoCobrador || !Empresa) {
        return res.status(400).json({ message: "Faltan parámetros" });
    }

    try {
        // Obtiene el repositorio de la entidad AccionesUbicaciones
        const AccionesUbicacionesRepository = AppDataSource.getRepository(AccionesUbicaciones);

        // Crea el registro con los datos recibidos
        const registro = AccionesUbicacionesRepository.create({
            idAccion,
            tipoAccion,
            latitude,
            longitude,
            ICidIngresoCobrador,
            Empresa,
            idCompra: idCompra || 0, // Usa valores por defecto si no se proporcionan
            idCombo1: idCombo1 || 0,
            idCombo2: idCombo2 || 0,
            idCombo3: idCombo3 || 0,
            TipoPago: TipoPago || 0,
            FechaPago: FechaPago || new Date(),
            IdBanco: IdBanco || 0,
            NumeroDeposito: NumeroDeposito || '',
            Url: Url || '',
            Valor: Valor || 0,
            Offline: Offline || 0,
            timestamp: timestamp ,
            Notas: Notas || ''
        });

        // Guarda el registro en la base de datos
        await AccionesUbicacionesRepository.save(registro);

        // Responde con un mensaje de éxito
        res.json({ message: "success" });

    } catch (error) {
        console.error("Error al insertar la ubicación:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};
