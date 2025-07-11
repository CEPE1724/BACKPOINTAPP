// models/Usuario.js


const { EntitySchema } = require('typeorm');


const Seteo = new EntitySchema({
    name: 'Seteo',
    tableName: 'Seteo',
    target: class Seteo {
        constructor() {
            this.idSeteo = undefined;
            this.AppVersion = "";
            this.linkVersion = "";
        }
    },
    columns: {
        idSeteo: {
            primary: true,
            type: 'int',
            generated: true
        },
        AppVersion: {
            type: 'varchar',
            length: 50
        },
        linkVersion: {
            type: 'varchar',
            length: 'MAX'
        }
    }
});

module.exports = Seteo;

          