const { AppDataSource } = require("../config/database");
const { In, Not } = require('typeorm');
const DispositivosAPP = require('../DispositivosAPP/model');
const NotificationUser = require('./model');
const Notifications = require('../Notifications/model');
const { getIO } = require('../../sockets/socketio');  // IMPORTAR getIO desde socketio
const { sendPushNotifications } = require('./expoPushService');

const { handleNewNotification } = require('../../sockets/eventHandlers'); // Asegúrate de importar el manejador

exports.allID = async (req, res) => {
    try {
        const UsuarioAPP = req.query.UsuarioAPP;

        if (!UsuarioAPP) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro UsuarioAPP"
            });
        }

        console.log(UsuarioAPP);
        const registros = await AppDataSource.getRepository(NotificationUser).find({ where: { UsuarioAPP: UsuarioAPP } });
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


exports.allIDNotification = async (req, res) => {
    try {
        const UserID = req.query.UserID;

        if (!UserID) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro UsuarioAPP"
            });
        }

        console.log(UserID);
        const registros = await AppDataSource.getRepository(NotificationUser).find({ where: { UserID: UserID } });
        console.log("hola", registros);

        // Verifica si no se encontraron registros del usuario
        if (registros.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No tienes notificaciones pendientes",

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
        getIO().emit('updatedNotifications', { UserID, notificaciones: notificacion });

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
        const UsuarioAPP = req.query.UsuarioAPP;

        // Verificar si falta el parámetro UsuarioAPP
        if (!UsuarioAPP) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro UsuarioAPP"
            });
        }

        // Realiza la consulta para obtener todos los registros del usuario
        const registros = await AppDataSource.getRepository(NotificationUser).find({
            where: { UsuarioAPP: UsuarioAPP }
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
        getIO().emit('updatedNotificationCount', { UsuarioAPP, count: notificationCount });

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

exports.countUserNotificacion = async (req, res) => {
    try {
        const UserID = req.query.UserID;

        // Verificar si falta el parámetro UsuarioAPP
        if (!UserID) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro UserID"
            });
        }

        // Realiza la consulta para obtener todos los registros del usuario
        const registros = await AppDataSource.getRepository(NotificationUser).find({
            where: {
                UserID: UserID
            }
        });

        // Verifica si no se encontraron registros del usuario
        if (registros.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No tienes notificaciones pendientes",
                count: 0 // Retorna 0 si no hay notificaciones
            });
        }

        // Contar los registros de notificaciones pendientes para el usuario
        const notificationCount = registros.length; // Se puede usar length si cada notificación está representada por un registro
        getIO().emit('updatedNotificationCount', { UserID, count: notificationCount });

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
        const { UsuarioAPP, idNotifications, UserID } = req.body;

        // Verificar si falta alguno de los parámetros requeridos
        if (!UsuarioAPP || !idNotifications) {
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
        const registro = await AppDataSource.getRepository(NotificationUser).findOne({ where: { UsuarioAPP, idNotifications } });

        // Si el usuario ya tiene la notificación, responder con un mensaje
        if (registro) {
            return res.status(409).json({
                success: false,
                message: "El usuario ya tiene esta notificación"
            });
        }

        // Crear un nuevo registro de notificación para el usuario


        const nuevoRegistro = AppDataSource.getRepository(NotificationUser).create();
        nuevoRegistro.UsuarioAPP = UsuarioAPP;
        nuevoRegistro.idNotifications = parseInt(idNotifications);
        nuevoRegistro.UserID = parseInt(UserID);
        nuevoRegistro.Status = 'unread';

        // Guardar el nuevo registro en la base de datos
        await AppDataSource.getRepository(NotificationUser).save(nuevoRegistro);

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

exports.createNotificacion = async (req, res) => {
    try {
        const { idNotifications, UserID } = req.body;

        // Verificar si falta alguno de los parámetros requeridos
        if (!UserID || !idNotifications) {
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
        const registro = await AppDataSource.getRepository(NotificationUser).findOne({ where: { UserID, idNotifications } });

        // Si el usuario ya tiene la notificación, responder con un mensaje
        if (registro) {
            return res.status(409).json({
                success: false,
                message: "El usuario ya tiene esta notificación"
            });
        }

        // Crear un nuevo registro de notificación para el usuario


        const nuevoRegistro = AppDataSource.getRepository(NotificationUser).create();
        nuevoRegistro.idNotifications = parseInt(idNotifications);
        nuevoRegistro.UserID = parseInt(UserID);
        nuevoRegistro.Status = 'unread';

        // Guardar el nuevo registro en la base de datos
        await AppDataSource.getRepository(NotificationUser).save(nuevoRegistro);

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



exports.sendNotification = async (req, res) => {
    console.log("sendNotification called");
    const { tokens, notification } = req.body;

    console.log("tokens:", tokens);
    console.log("notification:", notification);

    if (!Array.isArray(tokens) || tokens.length === 0 || !notification) {
        return res.status(400).json({
            error: 'Request must include "tokens" (array) and "notification" (object)',
        });
    }

    // Validar notificación
    const validation = validateNotification(notification);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: validation.message,
        });
    }
    const { type, title, body, url, empresa } = notification;

    try {

        // Aquí podrías guardar la notificación en base de datos si quieres
        // await saveNotificationToDb(notification);
        const idTipoEmpresa = empresa === 'POINT' ? 1 : 33;
        const dispositivos = await AppDataSource.getRepository(DispositivosAPP).find({ where: { TokenExpo: In(tokens), Empresa: idTipoEmpresa, idCom_Estado: Not(2) } });
        console.log("dispositivos", dispositivos);

        if (dispositivos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron dispositivos para enviar la notificación"
            });
        }
        const newNotification = AppDataSource.getRepository(Notifications).create();
        newNotification.Title = title;
        newNotification.Message = body;
        newNotification.Type = type;
        newNotification.URL = url || '';
        newNotification.Empresa = idTipoEmpresa;
        //newNotification.ImageURL = ImageURL;
        newNotification.IsActive = 1;
        await AppDataSource.getRepository(Notifications).save(newNotification);
        // obtener el id de la notificacion creada
        const idNotifications = newNotification.idNotifications;

        // consultar dispositivosAPP para obtener el UserID
        console.log("dispositivos",  dispositivos[0].idNomina);

        const nuevoRegistro = AppDataSource.getRepository(NotificationUser).create();
        nuevoRegistro.idNotifications = parseInt(idNotifications);
        nuevoRegistro.UserID = parseInt( dispositivos[0].idNomina);
        nuevoRegistro.Status = 'unread';


        await AppDataSource.getRepository(NotificationUser).save(nuevoRegistro);

        handleNewNotification(nuevoRegistro); // Emitir la notificación creada a través de socket


        const tickets = await sendPushNotifications(tokens, notification);

        return res.status(200).json({
            success: true,
            message: 'Notifications sent successfully',
            tickets,
        });
    } catch (error) {
        console.error("Error sending push notifications:", error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Unexpected error sending notifications',
        });
    }
};


function validateNotification(notification) {
    const { type, title, body, url, empresa } = notification;

    const validTypes = ['alert', 'info', 'promotion', 'update', 'warning'];
    const validEmpresas = ['POINT', 'CREDI']; // Reemplaza con tus empresas válidas
    if (!title || title.length < 5 || title.length > 255) {
        return {
            success: false,
            message: "El título debe tener entre 5 y 255 caracteres",
        };
    }

    if (!body || body.length < 10 || body.length > 255) {
        return {
            success: false,
            message: "El mensaje debe tener entre 10 y 255 caracteres",
        };
    }

    if (url && url.trim() !== "" && !/^https?:\/\/.+\..+/.test(url)) {
        return {
            success: false,
            message: "La URL no es válida",
        };
    }
    if (!validTypes.includes(type)) {
        return {
            success: false,
            message: "El tipo de notificación no es válido",
        };
    }

    if (!validEmpresas.includes(empresa)) {
        return {
            success: false,
            message: "La empresa no es válida",
        };
    }



    return { success: true };
}
