/*
CREATE TABLE EQFX_UAT_distribucion_endeudamiento (
    idEQFX_UAT_distribucion_endeudamiento INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    tipo_credito VARCHAR(100) DEFAULT '' ,
    saldo_deuda DECIMAL(18,2) DEFAULT 0.00,
    demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
    cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    titular DECIMAL(18,2) DEFAULT 0.00,
    garante DECIMAL(18,2) DEFAULT 0.00,
    codeudor DECIMAL(18,2) DEFAULT 0.00,
    tarjeta_credito DECIMAL(18,2) DEFAULT 0.00,
    acuerdo_concordatorio VARCHAR(50) DEFAULT '' ,
    detalle VARCHAR(50) DEFAULT '' ,
    opcion VARCHAR(50) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');

const EQFX_UAT_distribucion_endeudamiento = new EntitySchema({
    name: 'EQFX_UAT_distribucion_endeudamiento',
    tableName: 'EQFX_UAT_distribucion_endeudamiento',
    target: class EQFX_UAT_distribucion_endeudamiento {
        constructor() {
            this.idEQFX_UAT_distribucion_endeudamiento = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_corte = null;
            this.institucion = '';
            this.tipo_credito = '';
            this.saldo_deuda = 0.00;
            this.demanda_judicial = 0.00;
            this.cartera_castigada = 0.00;
            this.titular = 0.00;
            this.garante = 0.00;
            this.codeudor = 0.00;
            this.tarjeta_credito = 0.00;
            this.acuerdo_concordatorio = '';
            this.detalle = '';
            this.opcion = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_distribucion_endeudamiento: {
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
        tipo_credito: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        saldo_deuda: {
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
        titular: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        garante: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        codeudor: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        tarjeta_credito: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        acuerdo_concordatorio: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        detalle: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        opcion: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_distribucion_endeudamiento;