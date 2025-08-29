/* CREATE TABLE EQFX_UAT_historico_vencidos_comercial (
        idEQFX_UAT_historico_vencidos_comercial INT IDENTITY(1,1) PRIMARY KEY,
        idEQFX_IdentificacionConsultada INT NOT NULL,
        retroactivo VARCHAR(50) DEFAULT '' ,
        saldo_vencido DECIMAL(18,2) DEFAULT 0.00,
        FechaSistema DATETIME DEFAULT GETDATE()
    );*/
    const { EntitySchema } = require('typeorm');

    const EQFX_UAT_historico_vencidos_comercial = new EntitySchema({
        name: 'EQFX_UAT_historico_vencidos_comercial',
        tableName: 'EQFX_UAT_historico_vencidos_comercial',
        target: class EQFX_UAT_historico_vencidos_comercial {
            constructor() {
                this.idEQFX_UAT_historico_vencidos_comercial = undefined;
                this.idEQFX_IdentificacionConsultada = undefined;
                this.retroactivo = '';
                this.saldo_vencido = 0.00;
                this.FechaSistema = new Date();
            }
        }
        ,
        columns: {
            idEQFX_UAT_historico_vencidos_comercial: {
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
            saldo_vencido: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                default: 0.00
            },
            FechaSistema: {
                type: 'datetime',
                default: () => 'CURRENT_TIMESTAMP'
            }
        }
    });

    module.exports = EQFX_UAT_historico_vencidos_comercial;
