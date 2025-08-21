/*
CREATE TABLE EQFX_UAT_historico_cuota_estimada (
    idEQFX_UAT_historico_cuota_estimada INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    orden INT DEFAULT 0,
    retroactivo VARCHAR(50) DEFAULT '' ,
    cuota_mensual DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_historico_cuota_estimada = new EntitySchema({
    name: 'EQFX_UAT_historico_cuota_estimada',
    tableName: 'EQFX_UAT_historico_cuota_estimada',
    target: class EQFX_UAT_historico_cuota_estimada {
        constructor() {
            this.idEQFX_UAT_historico_cuota_estimada = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.orden = 0;
            this.retroactivo = '';
            this.cuota_mensual = 0.00;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_historico_cuota_estimada: {
            type: 'int',
            primary: true,
            generated: true,
            name: 'idEQFX_UAT_historico_cuota_estimada'
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false,
            name: 'idEQFX_IdentificacionConsultada'
        },
        orden: {
            type: 'int',
            default: 0,
            name: 'orden'
        },
        retroactivo: {
            type: 'varchar',
            length: 50,
            default: '',
            name: 'retroactivo'
        },
        cuota_mensual: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00,
            name: 'cuota_mensual'
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()',
            name: 'FechaSistema'
        }
    }
});
module.exports =  EQFX_UAT_historico_cuota_estimada ;