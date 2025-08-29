/*CREATE TABLE EQFX_UAT_estructura_vencimiento (
    idEQFX_UAT_estructura_vencimiento INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    por_vencer DECIMAL(18,2) DEFAULT 0.00,
    vencido DECIMAL(18,2) DEFAULT 0.00,
    no_devenga_int DECIMAL(18,2) DEFAULT 0.00,
    saldo_deuda DECIMAL(18,2) DEFAULT 0.00,
    demanda_judicial DECIMAL(18,2) DEFAULT 0.00,
    cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    acuerdo_concordatorio VARCHAR(50) DEFAULT '' ,
    opcion VARCHAR(50) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

 const { EntitySchema } = require('typeorm');

const EQFX_UAT_estructura_vencimiento = new EntitySchema({
    name: 'EQFX_UAT_estructura_vencimiento',
    tableName: 'EQFX_UAT_estructura_vencimiento',
    target: class EQFX_UAT_estructura_vencimiento {
        constructor() {
            this.idEQFX_UAT_estructura_vencimiento = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_corte = null;
            this.institucion = '';
            this.por_vencer = 0.00;
            this.vencido = 0.00;
            this.no_devenga_int = 0.00;
            this.saldo_deuda = 0.00;
            this.demanda_judicial = 0.00;
            this.cartera_castigada = 0.00;
            this.acuerdo_concordatorio = '';
            this.opcion = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_estructura_vencimiento: {
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
        por_vencer: {
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
        acuerdo_concordatorio: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        opcion: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        FechaSistema:{
          type:'datetime',
          default:'CURRENT_TIMESTAMP'
      }
    }
});

module.exports = EQFX_UAT_estructura_vencimiento;
