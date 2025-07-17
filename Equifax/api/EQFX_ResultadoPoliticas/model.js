// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_ResultadoPoliticas = new EntitySchema({
    name: 'EQFX_ResultadoPoliticas',
    tableName: 'EQFX_ResultadoPoliticas',
    target: class EQFX_ResultadoPoliticas {
        constructor() {
            this.idEQFX_ResultadoPoliticas  = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Politica = '';
            this.Valor = '';
            this.Resultado = '';
        }
    },
    columns: {
        idEQFX_ResultadoPoliticas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Politica: {
            type: 'varchar',
            length: 250
        },
        Valor: {
            type: 'varchar',
            length: 250
        },
        Resultado: {
            type: 'varchar',
            length: 250
        }
    
    }
});

module.exports = EQFX_ResultadoPoliticas;
