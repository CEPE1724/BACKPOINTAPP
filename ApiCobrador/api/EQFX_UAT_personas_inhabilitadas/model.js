/*CREATE TABLE EQFX_UAT_personas_inhabilitadas (
    idEQFX_UAT_personas_inhabilitadas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_inhabilitacion DATE NULL,
    tiempo_inhabilitacion INT DEFAULT 0,
    accion VARCHAR(255) DEFAULT '' ,
    motivo VARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_personas_inhabilitadas = new EntitySchema({
    name: 'EQFX_UAT_personas_inhabilitadas',
    tableName: 'EQFX_UAT_personas_inhabilitadas',
    target: class EQFX_UAT_personas_inhabilitadas {
        constructor() {
            this.idEQFX_UAT_personas_inhabilitadas = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_inhabilitacion = null;
            this.tiempo_inhabilitacion = 0;
            this.accion = '';
            this.motivo = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_personas_inhabilitadas: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        fecha_inhabilitacion: {
            type: 'date',
            nullable: true
        },
        tiempo_inhabilitacion: {
            type: 'int',
            default: 0
        },
        accion: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        motivo: {
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

module.exports = EQFX_UAT_personas_inhabilitadas;
