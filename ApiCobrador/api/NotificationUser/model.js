const { EntitySchema } = require('typeorm');

const NotificationUserSchema = new EntitySchema({
    name: 'NotificationUser',
    tableName: 'NotificationUser',
    target: class NotificationUser {
        constructor() {
            this.idNotificationUser = undefined;
            this.idNotifications = 0;
            this.UserID = 0;
            this.Status = '';
            this.UsuarioAPP = '';
        }
    },
    columns: {
        idNotificationUser: {
            primary: true,
            type: 'int',
            generated: true
        },
        idNotifications: {
            type: 'int'
        },
        UserID: {
            type: 'int'
        },
        Status: {
            type: 'nvarchar',
            length: 50
        },
        UsuarioAPP: {
            type: 'nvarchar',
            length: 50
        }
    }
});

module.exports = NotificationUserSchema;