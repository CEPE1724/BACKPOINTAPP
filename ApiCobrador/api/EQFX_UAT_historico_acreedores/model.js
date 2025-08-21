/*

CREATE TABLE EQFX_UAT_historico_acreedores (
    idEQFX_UAT_historico_acreedores INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    retroactivo VARCHAR(50) DEFAULT '' ,
    acreedores INT DEFAULT 0,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_historico_acreedores = new EntitySchema({
    name: 'EQFX_UAT_historico_acreedores',
    tableName: 'EQFX_UAT_historico_acreedores',
    target: class EQFX_UAT_historico_acreedores {
        constructor() {
            this.idEQFX_UAT_historico_acreedores = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.retroactivo = '';
            this.acreedores = 0;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_historico_acreedores: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        retroactivo: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        acreedores: {
            type: 'int',
            default: 0
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
    }
});
module.exports = EQFX_UAT_historico_acreedores;