/*

CREATE TABLE EQFX_UAT_detalle_deuda_actual_sicom (
    idEQFX_UAT_detalle_deuda_actual_sicom INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    fecha_corte DATE NULL,
    tipo_riesgo VARCHAR(100) DEFAULT '' ,
    tipo_credito VARCHAR(100) DEFAULT '' ,
    cupo_monto_original DECIMAL(18,2) DEFAULT 0.00,
    fecha_apertura DATE NULL,
    fecha_vencimiento DATE NULL,
    total_vencer DECIMAL(18,2) DEFAULT 0.00,
    ndi DECIMAL(18,2) DEFAULT 0.00,
    total_vencido DECIMAL(18,2) DEFAULT 0.00,
    dem_jud DECIMAL(18,2) DEFAULT 0.00,
    cart_cast DECIMAL(18,2) DEFAULT 0.00,
    saldo_deuda DECIMAL(18,2) DEFAULT 0.00,
    cuota_mensual DECIMAL(18,2) DEFAULT 0.00,
    dias_morosidad INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_detalle_deuda_actual_sicom = new EntitySchema({
    name: 'EQFX_UAT_detalle_deuda_actual_sicom',
    tableName: 'EQFX_UAT_detalle_deuda_actual_sicom',
    target: class EQFX_UAT_detalle_deuda_actual_sicom {
        constructor() {
            this.idEQFX_UAT_detalle_deuda_actual_sicom = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.fecha_corte = null;
            this.tipo_riesgo = '';
            this.tipo_credito = '';
            this.cupo_monto_original = 0.00;
            this.fecha_apertura = null;
            this.fecha_vencimiento = null;
            this.total_vencer = 0.00;
            this.ndi = 0.00;
            this.total_vencido = 0.00;
            this.dem_jud = 0.00;
            this.cart_cast = 0.00;
            this.saldo_deuda = 0.00;
            this.cuota_mensual = 0.00;
            this.dias_morosidad = 0;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_detalle_deuda_actual_sicom: {
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
            default: ''
        },
        fecha_corte: {
            type: 'date',
            nullable: true
        },
        tipo_riesgo: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        tipo_credito: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        cupo_monto_original: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        fecha_apertura: {
            type: 'date',
            nullable: true
        },
        fecha_vencimiento: {
            type: 'date',
            nullable: true
        },
        total_vencer: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        ndi: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        total_vencido: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        dem_jud: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        cart_cast: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_deuda: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        cuota_mensual: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        dias_morosidad: {
            type: 'int',
            default: 0
        },
        FechaSistema: {
            type: 'datetime',
            create: true,
            update: false,
            default: () => 'GETDATE()'
        }
    }
});
module.exports = EQFX_UAT_detalle_deuda_actual_sicom;