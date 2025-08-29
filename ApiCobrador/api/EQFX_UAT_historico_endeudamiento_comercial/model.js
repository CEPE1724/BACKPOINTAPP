/*CREATE TABLE EQFX_UAT_historico_endeudamiento_comercial (
    idEQFX_UAT_historico_endeudamiento_comercial INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    retroactivo VARCHAR(50) DEFAULT '' ,
    saldo_total DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_historico_endeudamiento_comercial = new EntitySchema({
    name: 'EQFX_UAT_historico_endeudamiento_comercial',
    tableName: 'EQFX_UAT_historico_endeudamiento_comercial',
    target: class EQFX_UAT_historico_endeudamiento_comercial {
        constructor() {
            this.idEQFX_UAT_historico_endeudamiento_comercial = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.retroactivo = '';
            this.saldo_total = 0.00;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_historico_endeudamiento_comercial: {
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
        saldo_total: {
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
module.exports = EQFX_UAT_historico_endeudamiento_comercial;