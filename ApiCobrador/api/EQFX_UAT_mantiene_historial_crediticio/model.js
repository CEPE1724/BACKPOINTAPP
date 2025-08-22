/*CREATE TABLE EQFX_UAT_mantiene_historial_crediticio (
    idEQFX_UAT_mantiene_historial_crediticio INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    titulo VARCHAR(255) DEFAULT '' ,
    primera_fecha DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_mantiene_historial_crediticio = new EntitySchema({
    name: 'EQFX_UAT_mantiene_historial_crediticio',
    tableName: 'EQFX_UAT_mantiene_historial_crediticio',
    target: class EQFX_UAT_mantiene_historial_crediticio {
        constructor() {
            this.idEQFX_UAT_mantiene_historial_crediticio = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.titulo = '';
            this.primera_fecha = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_mantiene_historial_crediticio: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        titulo: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        primera_fecha: {
            type: 'date',
            nullable: true
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_mantiene_historial_crediticio;