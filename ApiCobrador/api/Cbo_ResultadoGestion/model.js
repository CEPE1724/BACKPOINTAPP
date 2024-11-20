// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Cbo_ResultadoGestionSchema = new EntitySchema({
    name: 'Cbo_ResultadoGestion',
    tableName: 'Cbo_ResultadoGestion',
    target: class Cbo_ResultadoGestion {
        constructor() {

            this.idCbo_ResultadoGestion  = undefined;
            this.idCbo_EstadoGestion = 0,
            this.Resultado = "",
            this.idCbo_EstadosTipocontacto = 0
        }
    },
    columns: {
        idCbo_ResultadoGestion: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCbo_EstadoGestion: {
            type: 'int'
        },
        Resultado: {
            type: 'varchar',
            length: 255
        },
        idCbo_EstadosTipocontacto: {
            type: 'int'
        }
        
    }
});

module.exports = Cbo_ResultadoGestionSchema;
