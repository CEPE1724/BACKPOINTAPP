/*
CREATE TABLE EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes (
    idEQFX_UAT_garantias_personales_codeudores_operaciones_vigentes INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    tipo_deudor VARCHAR(50) DEFAULT '' ,
    nombre_titular VARCHAR(255) DEFAULT '' ,
    identificacion_titular VARCHAR(50) DEFAULT '' ,
    numero_operacion VARCHAR(50) DEFAULT '' ,
    institucion VARCHAR(255) DEFAULT '' ,
    deuda_total DECIMAL(18,2) DEFAULT 0.00 ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes = new EntitySchema({
    name: 'EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes',
    tableName: 'EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes',
    target: class EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes {
        constructor() {
            this.idEQFX_UAT_garantias_personales_codeudores_operaciones_vigentes = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.tipo_deudor = '';
            this.nombre_titular = '';
            this.identificacion_titular = '';
            this.numero_operacion = '';
            this.institucion = '';
            this.deuda_total = 0.00;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_garantias_personales_codeudores_operaciones_vigentes: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        tipo_deudor: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        nombre_titular: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        identificacion_titular: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        numero_operacion: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        institucion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        deuda_total: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
    }
});
module.exports = EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes;