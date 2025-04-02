const { AppDataSource } = require("../config/database");
const { In } = require('typeorm');

const NotificationsSchema = require('./model'); // Ensure you are destructuring the correct export

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
        const validTypes = ['alert', 'info', 'promotion', 'update', 'warning'];
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
       

