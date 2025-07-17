// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Cbo_EstadosTipocontactoSchema = new EntitySchema({
    name: 'Cbo_EstadosTipocontacto',
    tableName: 'Cbo_EstadosTipocontacto',
    target: class Cbo_EstadosTipocontacto {
        constructor() {

            this.idCbo_EstadosTipocontacto  = undefined;
            this.idCbo_EstadoGestion = 0,
            this.Estado = 0,
            this.Activo = 1;
        }
    },
    columns: {
        idCbo_EstadosTipocontacto: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCbo_EstadoGestion : {
            type: 'int'
        },
        Estado : {
            type: 'varchar',
            length: 255
        },
        Activo: {
            type: 'int'
        }
    }
});

module.exports = Cbo_EstadosTipocontactoSchema;
