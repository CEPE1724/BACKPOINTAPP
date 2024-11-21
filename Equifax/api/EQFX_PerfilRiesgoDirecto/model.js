

// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_PerfilRiesgoDirecto = new EntitySchema({
    name: 'EQFX_PerfilRiesgoDirecto',
    tableName: 'EQFX_PerfilRiesgoDirecto',
    target: class EQFX_PerfilRiesgoDirecto {
        constructor() {
            this.idEQFX_PerfilRiesgoDirecto = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Indicador = "";
            this.Valor = "";
            this.Fecha = new Date();
        }
    },

    columns: {
        idEQFX_PerfilRiesgoDirecto: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        Indicador: {
            type: 'varchar',
            length: 30
        },
        Valor: {
            type: 'varchar',
            length: 8000
        },
        Fecha: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
        
    }
});

module.exports = EQFX_PerfilRiesgoDirecto;
