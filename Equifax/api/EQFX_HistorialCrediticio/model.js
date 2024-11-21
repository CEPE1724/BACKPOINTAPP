
const { EntitySchema } = require('typeorm');

const EQFX_HistorialCrediticio = new EntitySchema({
    name: 'EQFX_HistorialCrediticio',
    tableName: 'EQFX_HistorialCrediticio',
    target: class EQFX_HistorialCrediticio {

        constructor() {
            this.idEQFX_HistorialCrediticio = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Titulo = '';
            this.PrimeraFecha = new Date();

        }
    },

    columns: {
        idEQFX_HistorialCrediticio: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Titulo: {
            type: 'varchar',
            length: 50
        },
        PrimeraFecha: {
            type: 'datetime'
        }
    }
});

module.exports = EQFX_HistorialCrediticio;
