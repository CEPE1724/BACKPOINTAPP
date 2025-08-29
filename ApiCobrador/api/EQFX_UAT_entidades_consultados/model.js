/*CREATE TABLE EQFX_UAT_entidades_consultados (
    idEQFX_UAT_entidades_consultados INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    nombre_cliente VARCHAR(255) DEFAULT '' ,
    mes1 VARCHAR(10) DEFAULT '' ,
    mes2 VARCHAR(10) DEFAULT '' ,
    mes3 VARCHAR(10) DEFAULT '' ,
    mes4 VARCHAR(10) DEFAULT '' ,
    mes5 VARCHAR(10) DEFAULT '' ,
    mes6 VARCHAR(10) DEFAULT '' ,
    mes7 VARCHAR(10) DEFAULT '' ,
    mes8 VARCHAR(10) DEFAULT '' ,
    mes9 VARCHAR(10) DEFAULT '' ,
    mes10 VARCHAR(10) DEFAULT '' ,
    mes11 VARCHAR(10) DEFAULT '' ,
    mes12 VARCHAR(10) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_entidades_consultados = new EntitySchema({
    name: 'EQFX_UAT_entidades_consultados',
    tableName: 'EQFX_UAT_entidades_consultados',
    target: class EQFX_UAT_entidades_consultados {
        constructor() {
            this.idEQFX_UAT_entidades_consultados = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.nombre_cliente = '';
            this.mes1 = '';
            this.mes2 = '';
            this.mes3 = '';
            this.mes4 = '';
            this.mes5 = '';
            this.mes6 = '';
            this.mes7 = '';
            this.mes8 = '';
            this.mes9 = '';
            this.mes10 = '';
            this.mes11 = '';
            this.mes12 = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_entidades_consultados: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        nombre_cliente: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        mes1: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes2: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes3: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes4: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes5: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes6: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes7: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes8: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes9: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes10: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes11: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        mes12: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            createDate: true
        }
    }
});
module.exports = EQFX_UAT_entidades_consultados;