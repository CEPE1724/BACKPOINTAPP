const { AppDataSource } = require("../config/database");
const { In } = require('typeorm');

const NotificationsSchema = require('./model'); // Ensure you are destructuring the correct export
const NotificationUserSchema = require('../NotificationUser/model'); // Ensure you are destructuring the correct export

const { handleNewNotification } = require('../../sockets/eventHandlers'); // Asegúrate de que la ruta sea correcta
exports.create = async (req, res) => {
    try {
        const { Title, Message, CreatedAt, Type, URL, ImageURL, IsActive, Empresa } = req.body; // Asegúrate de que estos campos estén en el cuerpo de la solicitud
        console.log("body", req.body);
        // validar que title tenga minimo 5 caracteres y maximo 255
        if (Title.length < 5 || Title.length > 255) {
            return res.status(400).json({
                success: false,
                message: "El título debe tener entre 5 y 255 caracteres"
            });
        }
        // validar que message tenga minimo 10 caracteres y maximo 255
        if (Message.length < 10 || Message.length > 255) {
            return res.status(400).json({
                success: false,
                message: "El mensaje debe tener entre 10 y 255 caracteres"
            });
        }
        // validar createdAt sea una fecha valida
        if (isNaN(Date.parse(CreatedAt))) {
            return res.status(400).json({
                success: false,
                message: "La fecha de creación no es válida"
            });
        }

        // validarq ue type este en el enum
        const validTypes = ['alert', 'info', 'promotion', 'update', 'warning', 'success', 'event'];
        if (!validTypes.includes(Type)) {
            return res.status(400).json({
                success: false,
                message: "El tipo de notificación no es válido"
            });
        }
        // vlaida qu ese asolo 1 y 36  la empresa
        // validar empresa
        if (Empresa < 0) {
            return res.status(400).json({
                success: false,
                message: "La empresa no es válida"
            });
        }
        // crear una notificacion
        const newNotification = AppDataSource.getRepository(NotificationsSchema).create();
        newNotification.Title = Title;
        newNotification.Message = Message;
        newNotification.CreatedAt = CreatedAt;
        newNotification.Type = Type;
        newNotification.URL = URL;
        newNotification.ImageURL = ImageURL;
        newNotification.IsActive = IsActive;
        newNotification.Empresa = Empresa;

        await AppDataSource.getRepository(NotificationsSchema).save(newNotification);

        return res.status(201).json({
            success: true,
            message: "Notificación creada exitosamente",
            data: newNotification
        });
    }
    catch (error) {
        console.error("Error al crear la notificación:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


exports.getAll = async (req, res) => {
    try {
        const notifications = await AppDataSource.getRepository(NotificationsSchema).find({
            order: {
                CreatedAt: 'DESC'
            }
        });
        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}
       
//Obtener notificaciones por idNotifications de usuario
exports.getId = async (req, res) => {
    try {
        const { idNotifications } = req.params;
        console.log("idNotifications", idNotifications);
        const notifications = await AppDataSource.getRepository(NotificationsSchema).find({
            where: {
                idNotifications: In(idNotifications.split(',')),
            },
            order: {
                CreatedAt: 'DESC'
            }
        });
        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

//obtener notificaciones por (Title, Message, CreatedAt, Status, Type, URL, ImageURL, IsActive)
exports.getBy = async (req, res) => {
    try {
        const { Title, Message, CreatedAt, Status, Type, URL, ImageURL, IsActive } = req.query; 
        console.log("query params", req.query);

        // consulta dinámica
        const queryBuilder = AppDataSource.getRepository(NotificationsSchema)
            .createQueryBuilder("notification");

        // condiciones 
        if (Title) {
            const titles = Title.split(',');
            queryBuilder.andWhere("notification.Title IN (:...titles)", { titles });
        }
        if (Message) {
            const messages = Message.split(',');
            queryBuilder.andWhere("notification.Message IN (:...messages)", { messages });
        } 
        if (CreatedAt) {
            const dates = CreatedAt.split(',');
            queryBuilder.andWhere("notification.CreatedAt IN (:...dates)", { dates });
        }  
        if (Status) {
            const statuses = Status.split(',');
            queryBuilder.andWhere("notification.Status IN (:...statuses)", { statuses });
        }
        if (Type) {
            const types = Type.split(',');
            queryBuilder.andWhere("notification.Type IN (:...types)", { types });
        }
        if (URL) {
            const urls = URL.split(',');
            queryBuilder.andWhere("notification.URL IN (:...urls)", { urls });
        }
        if (ImageURL) {
            const imageUrls = ImageURL.split(',');
            queryBuilder.andWhere("notification.ImageURL IN (:...imageUrls)", { imageUrls });
        }
        if (IsActive !== undefined) {
            // Convertir a booleano
            const isActiveValues = IsActive.split(',').map(val => 
                val.toLowerCase() === 'true' ? true : 
                val.toLowerCase() === 'false' ? false : val
            );
            queryBuilder.andWhere("notification.IsActive IN (:...isActiveValues)", { isActiveValues });
        }

        // Ordenar por fecha de creación descendente
        queryBuilder.orderBy("notification.CreatedAt", "DESC");

        // Ejecutar la consulta
        const notifications = await queryBuilder.getMany();

        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}


// Actualizar notificaciones por idNotifications de usuario
exports.updateNotification = async (req, res) => {
    try {
        const { idNotifications } = req.body;

        if(!idNotifications || idNotifications.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No se proporcionaron IDs de notificaciones"
            });
        }
        
        console.log("idNotifications", idNotifications);
        const notifications = await AppDataSource.getRepository(NotificationsSchema).find({
            where: {
                idNotifications: idNotifications
            }
        });
        if (notifications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron notificaciones con los IDs proporcionados"
            });
        }
        // Actualizar el campo IsRead a true
        await AppDataSource.getRepository(NotificationsSchema).update(
            { idNotifications: idNotifications },
            { Status: 'read' } // Cambia el campo que deseas actualizar
        );

        await AppDataSource.getRepository(NotificationUserSchema).update(
            { idNotifications: idNotifications },
            { Status: 'read' } // Cambia el campo que deseas actualizar
        );
        // Emitir el evento de nueva notificación
        notifications.forEach(notification => {
            handleNewNotification({ ...notification, isNew: false });
        });
        return res.status(200).json({
            success: true,
            message: "Notificaciones actualizadas exitosamente",
            data: notifications
        });
    }
    catch (error) {
        console.error("Error al actualizar las notificaciones:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
}