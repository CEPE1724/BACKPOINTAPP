/*CREATE TABLE EQFX_UAT_saldos_por_vencer (
    idEQFX_UAT_saldos_por_vencer INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    total_por_vencer DECIMAL(18,2) DEFAULT 0.00,
    por_vencer_0_a_1 DECIMAL(18,2) DEFAULT 0.00,
    por_vencer_1_a_3 DECIMAL(18,2) DEFAULT 0.00,
    por_vencer_3_a_6 DECIMAL(18,2) DEFAULT 0.00,
    por_vencer_6_a_12 DECIMAL(18,2) DEFAULT 0.00,
    por_vencer_12 DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_saldos_por_vencer = new EntitySchema({
    name: 'EQFX_UAT_saldos_por_vencer',
    tableName: 'EQFX_UAT_saldos_por_vencer',
    target: class EQFX_UAT_saldos_por_vencer {
        constructor() {
            this.idEQFX_UAT_saldos_por_vencer = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_corte = null;
            this.institucion = '';
            this.total_por_vencer = 0.00;
            this.por_vencer_0_a_1 = 0.00;
            this.por_vencer_1_a_3 = 0.00;
            this.por_vencer_3_a_6 = 0.00;
            this.por_vencer_6_a_12 = 0.00;
            this.por_vencer_12 = 0.00;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_saldos_por_vencer: {
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
        total_por_vencer: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        por_vencer_0_a_1: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        por_vencer_1_a_3: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        por_vencer_3_a_6: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        por_vencer_6_a_12: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        por_vencer_12: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        FechaSistema: {
            type: 'datetime',
            createDate: true
        }
    }
});

module.exports = EQFX_UAT_saldos_por_vencer;
