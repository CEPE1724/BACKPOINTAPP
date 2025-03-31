
const { EntitySchema } = require('typeorm');

const NotificationsSchema = new EntitySchema({
    name: 'Notifications',
    tableName: 'Notifications',
    target: class Notifications {
        idNotifications;
        Title = '';
        Message = '';
        CreatedAt = new Date();
        Type = '';
        URL = '';
        ImageURL = '';
        IsActive = true;
        Status = 'unread'; // Agregar el campo Status
     },
    columns: {
        idNotifications: {
            primary: true,
            type: 'int',
            generated: true
        },
        Title: {
            type: 'nvarchar',
            length: 255
        },
        Message: {
            type: 'nvarchar',
            length: 'max'
        },
        CreatedAt: {
            type: 'datetime'
        },
        Type: {
            type: 'nvarchar',
            length: 50
        },
        Status: { // Añadir el campo Status si es relevante
            type: 'nvarchar',
            length: 50,
            default: 'unread'
        },
        URL: {
            type: 'nvarchar',
            length: 255
        },
        ImageURL: {
            type: 'nvarchar',
            length: 255
        },
        IsActive: {
            type: 'bit',
            default: true
        }
    }
});

module.exports = NotificationsSchema;
