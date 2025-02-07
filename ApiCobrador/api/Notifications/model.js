

const { EntitySchema } = require('typeorm');

const NotificationsSchema = new EntitySchema({
    name: 'Notifications',
    tableName: 'Notifications',
    target: class Notifications {
        constructor() {
            this.idNotifications = undefined;
            this.Title = '';
            this.Message = '';
            this.CreatedAt = new Date();
            this.Type = '';
            this.Status = '';
            this.URL = '';
            this.ImageURL = '';
            this.IsActive = true;
        }
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
        Status: {
            type: 'nvarchar',
            length: 50
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
            type: 'bit'
        }
    }
      
});

module.exports = NotificationsSchema;