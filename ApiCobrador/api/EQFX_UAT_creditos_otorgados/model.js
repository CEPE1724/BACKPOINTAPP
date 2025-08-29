/*CREATE TABLE EQFX_UAT_creditos_otorgados (
    idEQFX_UAT_creditos_otorgados INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    estado_operacion VARCHAR(50) DEFAULT '' ,
    tipo_credito VARCHAR(50) DEFAULT '' ,
    valor_operacion DECIMAL(18,2) DEFAULT 0.00,
    titular DECIMAL(18,2) DEFAULT 0.00,
    codeudor DECIMAL(18,2) DEFAULT 0.00,
    garante DECIMAL(18,2) DEFAULT 0.00,
    fecha_concesion DATE NULL,
    fecha_vencimiento DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_creditos_otorgados = new EntitySchema({
    name: 'EQFX_UAT_creditos_otorgados',
    tableName: 'EQFX_UAT_creditos_otorgados',
    target: class EQFX_UAT_creditos_otorgados {
        constructor() {
            this.idEQFX_UAT_creditos_otorgados = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.estado_operacion = '';
            this.tipo_credito = '';
            this.valor_operacion = 0.00;
            this.titular = 0.00;
            this.codeudor = 0.00;
            this.garante = 0.00;
            this.fecha_concesion = null;
            this.fecha_vencimiento = null;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_creditos_otorgados: {
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
        estado_operacion: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        tipo_credito: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        valor_operacion: {
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
        codeudor: {
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
        fecha_concesion: {
            type: 'date',
            nullable: true
        },
        fecha_vencimiento: {
            type: 'date',
            nullable: true
        },
        FechaSistema:{
          type:'datetime',
          default:'CURRENT_TIMESTAMP'
      }
    }
});

module.exports = EQFX_UAT_creditos_otorgados;
    