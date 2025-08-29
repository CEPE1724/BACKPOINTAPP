/*CREATE TABLE EQFX_UAT_indicador_impacto_economico (
    idEQFX_UAT_indicador_impacto_economico INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    indicador VARCHAR(255) DEFAULT '' ,
    ingreso DECIMAL(18,2) DEFAULT 0.00,
    cuota_financiera DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');

const EQFX_UAT_indicador_impacto_economico = new EntitySchema({
    name: 'EQFX_UAT_indicador_impacto_economico',
    tableName: 'EQFX_UAT_indicador_impacto_economico',
    target: class EQFX_UAT_indicador_impacto_economico {
        constructor() {
            this.idEQFX_UAT_indicador_impacto_economico = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.indicador = '';
            this.ingreso = 0.00;
            this.cuota_financiera = 0.00;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_indicador_impacto_economico: {
            type: 'int',
            primary: true,
            generated: true,
            name: 'idEQFX_UAT_indicador_impacto_economico'
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false,
            name: 'idEQFX_IdentificacionConsultada'
        },
        indicador: {
            type: 'varchar',
            length: 255,
            default: '',
            name: 'indicador'
        },
        ingreso: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00,
            name: 'ingreso'
        },
        cuota_financiera: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00,
            name: 'cuota_financiera'
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP',
            name: 'FechaSistema'
        }
    }
});
module.exports = EQFX_UAT_indicador_impacto_economico;