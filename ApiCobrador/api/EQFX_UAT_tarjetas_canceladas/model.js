/*CREATE TABLE EQFX_UAT_tarjetas_canceladas (
    idEQFX_UAT_tarjetas_canceladas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    numero_tarjeta VARCHAR(50) DEFAULT '' ,
    fecha_cancelacion DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);
*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_tarjetas_canceladas = new EntitySchema({
    name: 'EQFX_UAT_tarjetas_canceladas',
    tableName: 'EQFX_UAT_tarjetas_canceladas',
    target: class EQFX_UAT_tarjetas_canceladas {
        constructor() {
            this.idEQFX_UAT_tarjetas_canceladas = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_corte = null;
            this.institucion = '';
            this.numero_tarjeta = '';
            this.fecha_cancelacion = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_tarjetas_canceladas: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        fecha_corte: {
            type: 'date',
            nullable: true
        },
        institucion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        numero_tarjeta: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        fecha_cancelacion: {
            type: 'date',
            nullable: true
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_tarjetas_canceladas;