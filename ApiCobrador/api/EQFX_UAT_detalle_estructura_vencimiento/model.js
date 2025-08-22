/*CREATE TABLE EQFX_UAT_detalle_estructura_vencimiento (
    idEQFX_UAT_detalle_estructura_vencimiento INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    vencido_0_a_1 DECIMAL(18,2) DEFAULT 0.00,
    vencido_1_a_2 DECIMAL(18,2) DEFAULT 0.00,
    vencido_2_a_3 DECIMAL(18,2) DEFAULT 0.00,
    vencido_3_a_6 DECIMAL(18,2) DEFAULT 0.00,
    vencido_6_a_9 DECIMAL(18,2) DEFAULT 0.00,
    vencido_9_a_12 DECIMAL(18,2) DEFAULT 0.00,
    vencido_12_a_24 DECIMAL(18,2) DEFAULT 0.00,
    vencido_24 DECIMAL(18,2) DEFAULT 0.00,
    vencido_36 DECIMAL(18,2) DEFAULT 0.00,
    vencido DECIMAL(18,2) DEFAULT 0.00,
    no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
    demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
    cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


    const { EntitySchema } = require('typeorm');
    const EQFX_UAT_detalle_estructura_vencimiento = new EntitySchema({
        name: 'EQFX_UAT_detalle_estructura_vencimiento',
        tableName: 'EQFX_UAT_detalle_estructura_vencimiento',
        target: class EQFX_UAT_detalle_estructura_vencimiento {
            constructor() {
                this.idEQFX_UAT_detalle_estructura_vencimiento = undefined;
                this.idEQFX_IdentificacionConsultada = undefined;
                this.fecha_corte = null;
                this.vencido_0_a_1 = 0.00;
                this.vencido_1_a_2 = 0.00;
                this.vencido_2_a_3 = 0.00;
                this.vencido_3_a_6 = 0.00;
                this.vencido_6_a_9 = 0.00;
                this.vencido_9_a_12 = 0.00;
                this.vencido_12_a_24 = 0.00;
                this.vencido_24 = 0.00;
                this.vencido_36 = 0.00;
                this.vencido = 0.00;
                this.no_devenga_int = 0.00;
                this.demanda_judicial = 0.00;
                this.cartera_castigada = 0.00;
                this.FechaSistema = new Date();
            }
        },
        columns: {
            idEQFX_UAT_detalle_estructura_vencimiento: {
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
            vencido_0_a_1: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_1_a_2: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_2_a_3: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_3_a_6: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_6_a_9: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_9_a_12: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_12_a_24: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_24: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            vencido_36: {
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
            no_devenga_int: {
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
            FechaSistema:{
              type:'datetime',
              default:'CURRENT_TIMESTAMP'
            },
        }
    });
    module.exports =  EQFX_UAT_detalle_estructura_vencimiento ;