/*CREATE TABLE EQFX_UAT_sujeto_al_dia (
    idEQFX_UAT_sujeto_al_dia INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    fecha_corte DATE NULL,
    mensaje VARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_sujeto_al_dia = new EntitySchema({
    name: 'EQFX_UAT_sujeto_al_dia',
    tableName: 'EQFX_UAT_sujeto_al_dia',
    target: class EQFX_UAT_sujeto_al_dia {
        constructor() {
            this.idEQFX_UAT_sujeto_al_dia = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.fecha_corte = null;
            this.mensaje = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_sujeto_al_dia: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        institucion: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        fecha_corte: {
            type: 'date',
            nullable: true
        },
        mensaje: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_sujeto_al_dia ;