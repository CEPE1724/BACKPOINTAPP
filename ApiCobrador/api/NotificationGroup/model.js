

const { EntitySchema } = require('typeorm');

const NotificationGroupSchema = new EntitySchema({
    name: 'NotificationGroup',
    tableName: 'NotificationGroup',
    target: class NotificationGroup {
        constructor() {
            this.idNotificationGroup = undefined;
            this.idNotifications = 0;
            this.GroupID = 0;
            this.Status = '';
        }
    },
    columns: {
        idNotificationGroup: {
            primary: true,
            type: 'int',
            generated: true
        },
        idNotifications: {
            type: 'int'
        },
        GroupID: {
            type: 'int'
        },
        Status: {
            type: 'nvarchar',
            length: 50
        }
    }
});

module.exports = NotificationGroupSchema;