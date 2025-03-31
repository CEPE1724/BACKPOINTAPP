const { AppDataSource } = require("../config/database");
const { In } = require('typeorm');

const Notifications = require('./model');
const Notifications = require('../Notifications/model');
const { getIO } = require('../../sockets/socketio');  // IMPORTAR getIO desde socketio

const { handleNewNotification } = require('../../sockets/eventHandlers'); // Asegúrate de importar el manejador

exports.allID = async (req, res) => {
    try {
        const idNotifications = req.query.idNotifications;

        if (!idNotifications) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro idNotifications"
            });
        }

        console.log(idNotifications);
        const registros = await AppDataSource.getRepository(Notifications).find({ where: { idNotifications: idNotifications } });
        console.log("hola", registros);

        // Verifica si no se encontraron registros del usuario
        if (registros.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tienes notificaciones pendientes"
            });
        }

        // Extraer todos los idNotifications de los registros del usuario
        const idNotificationsArray = registros.map(registro => registro.idNotifications);

        // Consulta las notificaciones asociadas usando los idNotifications encontrados
        const notificacion = await AppDataSource.getRepository(Notifications).find({
            where: { 
                idNotifications: In(idNotificationsArray), // In() permite buscar múltiples IDs
                Status: 'unread'
            }
        });

        // Verifica si no se encontraron notificaciones asociadas
        if (notificacion.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron notificaciones para este usuario"
            });
        }
        getIO().emit('updatedNotifications', { UsuarioAPP, notificaciones: notificacion });

        // Responde con las notificaciones encontradas
        return res.status(200).json({
            success: true,
            message: "Notificaciones obtenidas exitosamente",
            data: notificacion
        });
    } catch (error) {
        console.error("Error al realizar la consulta:", error);

        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

exports.countUser = async (req, res) => {
    try {
        const idNotifications = req.query.idNotifications;

        // Verificar si falta el parámetro idNotifications
        if (!idNotifications) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro idNotifications"
            });
        }

        // Realiza la consulta para obtener todos los registros del usuario
        const registros = await AppDataSource.getRepository(Notifications).find({
            where: { idNotifications: idNotifications }
        });

        // Verifica si no se encontraron registros del usuario
        if (registros.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tienes notificaciones pendientes"
            });
        }

        // Contar los registros de notificaciones pendientes para el usuario
        const notificationCount = registros.length; // Se puede usar length si cada notificación está representada por un registro
        getIO().emit('updatedNotificationCount', { idNotifications, count: notificationCount });

        // Responder con el conteo de notificaciones
        return res.status(200).json({
            success: true,
            message: "Notificaciones encontradas",
            count: notificationCount // Retorna el número de notificaciones
        });

    } catch (error) {
        // Manejo de errores
        console.error("Error al realizar la consulta:", error);

        // Responder con mensaje de error genérico
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};


exports.create = async (req, res) => {
    try {
        const { idNotifications } = req.body;

        // Verificar si falta alguno de los parámetros requeridos
        if (!idNotifications) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros requeridos"
            });
        }
         // verificar si idNotifications existe
            const notificacion = await AppDataSource.getRepository(Notifications).findOne({ where: { idNotifications } });
            if (!notificacion) {
                return res.status(404).json({
                    success: false,
                    message: "La notificación no existe"
                });
            }

        // Verificar si el usuario ya tiene la notificación
        const registro = await AppDataSource.getRepository(Notifications).findOne({ where: { idNotifications } });

        // Si el usuario ya tiene la notificación, responder con un mensaje
        if (registro) {
            return res.status(409).json({
                success: false,
                message: "El usuario ya tiene esta notificación"
            });
        }

        // Crear un nuevo registro de notificación para el usuario
    

        const nuevoRegistro = AppDataSource.getRepository(Notifications).create();
        nuevoRegistro.idNotifications = parseInt(idNotifications);

        // Guardar el nuevo registro en la base de datos
        await AppDataSource.getRepository(Notifications).save(nuevoRegistro);

        handleNewNotification(nuevoRegistro); // Emitir la notificación creada a través de socket

        // Responder con un mensaje de éxito
        return res.status(201).json({
            success: true,
            message: "Notificación creada exitosamente"
        });

    } catch (error) {
        // Manejo de errores
        console.error("Error al realizar la consulta:", error);

        // Responder con mensaje de error genérico
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}