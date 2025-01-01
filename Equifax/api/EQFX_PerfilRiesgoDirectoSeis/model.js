

// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_PerfilRiesgoDirectoSeis = new EntitySchema({
    name: 'EQFX_PerfilRiesgoDirectoSeis',
    tableName: 'EQFX_PerfilRiesgoDirectoSeis',
    target: class EQFX_PerfilRiesgoDirectoSeis {
        constructor() {
            this.idEQFX_PerfilRiesgoDirectoSeis = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Indicador = "";
            this.Valor = "";
            this.Fecha = new Date();
        }
    },

    columns: {
        idEQFX_PerfilRiesgoDirectoSeis: {
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

module.exports = EQFX_PerfilRiesgoDirectoSeis;
