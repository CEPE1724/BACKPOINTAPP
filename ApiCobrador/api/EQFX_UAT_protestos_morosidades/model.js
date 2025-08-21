/*CREATE TABLE EQFX_UAT_protestos_morosidades (
    idEQFX_UAT_protestos_morosidades INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    morosidades INT DEFAULT 0,
    protestos INT DEFAULT 0,
    monto_total_morosidades DECIMAL(18,2) DEFAULT 0.00,
    total_numero_operaciones INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_protestos_morosidades = new EntitySchema({
    name: 'EQFX_UAT_protestos_morosidades',
    tableName: 'EQFX_UAT_protestos_morosidades',
    target: class EQFX_UAT_protestos_morosidades {
        constructor() {
            this.idEQFX_UAT_protestos_morosidades = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.morosidades = 0;
            this.protestos = 0;
            this.monto_total_morosidades = 0.00;
            this.total_numero_operaciones = 0;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_protestos_morosidades: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        morosidades: {
            type: 'int',
            default: 0
        },
        protestos: {
            type: 'int',
            default: 0
        },
        monto_total_morosidades: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        total_numero_operaciones: {
            type: 'int',
            default: 0
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_protestos_morosidades;