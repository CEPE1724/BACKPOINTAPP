
// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas = new EntitySchema({
    name: 'EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas',
    tableName: 'EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas',
    target: class EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas {
        constructor() {
            this.idEQFX_InformacionPosteriorFechaCorteOperacionesCanceladas = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.Institucion = "";
            this.NumeroOperacion = "";
            this.FechaCancelacion = new Date();
        }
    },
     
    columns: {
        idEQFX_InformacionPosteriorFechaCorteOperacionesCanceladas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'datetime',
            default: () => 'GETDATE()'
        },
        Institucion: {
            type: 'varchar',
            length: 60
        },
        NumeroOperacion: {
            type: 'varchar',
            length: 22
        },
        FechaCancelacion: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
       
        
    }
});

module.exports = EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas;