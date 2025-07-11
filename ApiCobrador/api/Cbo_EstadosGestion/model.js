// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Cbo_EstadosGestionSchema = new EntitySchema({
    name: 'Cbo_EstadosGestion',
    tableName: 'Cbo_EstadosGestion',
    target: class Cbo_EstadosGestion {
        constructor() {

            this.idCbo_EstadoGestion  = undefined;
            this.Estado = 0,
            this.Activo = 1;
        }
    },
    columns: {
        idCbo_EstadoGestion: {
            primary: true,
            type: 'int',
            generated: true
        },
        Estado: {
            type: 'varchar',
            length: 255
        },
        Activo: {
            type: 'int'
        }
    }
});

module.exports = Cbo_EstadosGestionSchema;
