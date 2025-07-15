// models/Usuario.js
const { EntitySchema } = require('typeorm');

const IngresoCobradorSchema = new EntitySchema({
    name: 'IngresoCobrador',
    tableName: 'IngresoCobrador',
    target: class IngresoCobrador {
        constructor() {
            this.idIngresoCobrador = undefined;
            this.Nombre = '';
            this.Cedula = '';
            this.Codigo = '';
        }
    },
    columns: {
        idIngresoCobrador: {
            primary: true,
            type: 'int',
            generated: true
        },
        Cedula: {
            type: 'varchar',
            length: 255
        },
        Nombre: {
            type: 'varchar',
            length: 255
        },
        Codigo: {
            type: 'varchar',
            length: 255
        },
    }
});

module.exports = IngresoCobradorSchema;
