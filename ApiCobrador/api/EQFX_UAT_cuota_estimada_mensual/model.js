/*CREATE TABLE EQFX_UAT_cuota_estimada_mensual (
    idEQFX_UAT_cuota_estimada_mensual INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    pago DECIMAL(18,2) DEFAULT 0.00,
    numero_creditos_comercial INT DEFAULT 0,
    total_vencido DECIMAL(18,2) DEFAULT 0.00,
    total_demanda DECIMAL(18,2) DEFAULT 0.00,
    total_cartera DECIMAL(18,2) DEFAULT 0.00,
    numero_creditos_iece INT DEFAULT 0,
    numero_operaciones_excluidas INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_cuota_estimada_mensual = new EntitySchema({
    name: 'EQFX_UAT_cuota_estimada_mensual',
    tableName: 'EQFX_UAT_cuota_estimada_mensual',
    target: class EQFX_UAT_cuota_estimada_mensual {
        constructor() {
            this.idEQFX_UAT_cuota_estimada_mensual = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.pago = 0.00;
            this.numero_creditos_comercial = 0;
            this.total_vencido = 0.00;
            this.total_demanda = 0.00;
            this.total_cartera = 0.00;
            this.numero_creditos_iece = 0;
            this.numero_operaciones_excluidas = 0;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_cuota_estimada_mensual: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        pago: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        numero_creditos_comercial: {
            type: 'int',
            default: 0
        },
        total_vencido: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        total_demanda: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        total_cartera: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        numero_creditos_iece: {
            type: 'int',
            default: 0
        },
        numero_operaciones_excluidas: {
            type: 'int',
            default: 0
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
    }
});

module.exports = EQFX_UAT_cuota_estimada_mensual;