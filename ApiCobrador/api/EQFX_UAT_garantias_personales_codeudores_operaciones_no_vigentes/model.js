/*CREATE TABLE EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes (
    idEQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    tipo_deudor VARCHAR(50) DEFAULT '' ,
    fecha_concesion DATE NULL,
    fecha_eliminacion DATE NULL,
    numero_documento VARCHAR(50) DEFAULT '' ,
    nombre_titular VARCHAR(255) DEFAULT '' ,
    institucion VARCHAR(255) DEFAULT '' ,
    numero_operacion VARCHAR(50) DEFAULT '' ,
    valor_operacion DECIMAL(18,2) DEFAULT 0.00 ,
    fecha_cancelacion DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes = new EntitySchema({
    name: 'EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes',
    tableName: 'EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes',
    target: class EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes {
        constructor() {
            this.idEQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.tipo_deudor = '';
            this.fecha_concesion = null;
            this.fecha_eliminacion = null;
            this.numero_documento = '';
            this.nombre_titular = '';
            this.institucion = '';
            this.numero_operacion = '';
            this.valor_operacion = 0.00;
            this.fecha_cancelacion = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes: {
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
        fecha_concesion: {
            type: 'date',
            nullable: true
        },
        fecha_eliminacion: {
            type: 'date',
            nullable: true
        },
        numero_documento: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        nombre_titular: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        institucion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        numero_operacion: {
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
        fecha_cancelacion: {
            type: 'date',
            nullable: true
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes;