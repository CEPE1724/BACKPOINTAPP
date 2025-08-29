/*

CREATE TABLE EQFX_UAT_valor_deuda_3_sistemas (
    idEQFX_UAT_valor_deuda_3_sistemas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion NVARCHAR(255) DEFAULT '' ,
    por_vencer DECIMAL(18,2) DEFAULT 0.00,
    no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
    vencido DECIMAL(18,2) DEFAULT 0.00,
    total DECIMAL(18,2) DEFAULT 0.00,
    demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
    cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_valor_deuda_3_sistemas = new EntitySchema({
    name: 'EQFX_UAT_valor_deuda_3_sistemas',
    tableName: 'EQFX_UAT_valor_deuda_3_sistemas',
    target: class EQFX_UAT_valor_deuda_3_sistemas {
        constructor() {
            this.idEQFX_UAT_valor_deuda_3_sistemas = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.por_vencer = 0.00;
            this.no_devenga_int = 0.00;
            this.vencido = 0.00;
            this.total = 0.00;
            this.demanda_judicial = 0.00;
            this.cartera_castigada = 0.00;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_valor_deuda_3_sistemas: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        institucion: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        por_vencer: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        no_devenga_int: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        vencido: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        total: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        demanda_judicial: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        cartera_castigada: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_valor_deuda_3_sistemas;
