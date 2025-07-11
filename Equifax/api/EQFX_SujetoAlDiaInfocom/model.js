
const { EntitySchema } = require('typeorm');

const EQFX_SujetoAlDiaInfocom = new EntitySchema({
    name: 'EQFX_SujetoAlDiaInfocom',
    tableName: 'EQFX_SujetoAlDiaInfocom',
    target: class EQFX_SujetoAlDiaInfocom {
        constructor() {
            this.idEQFX_SujetoAlDiaInfocom = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Institucion = '';
            this.FechaCorte = '';
            this.Mensaje = '';
        }
    },
    columns: {
        idEQFX_SujetoAlDiaInfocom: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Institucion: {
            type: 'varchar',
            length: 109
        },
        FechaCorte: {
            type: 'varchar',
            length: 10
        },
        Mensaje: {
            type: 'varchar',
            length: 27
        },
        FechaSistema: {
            type: 'datetime'
        }
    }
});

module.exports = EQFX_SujetoAlDiaInfocom;