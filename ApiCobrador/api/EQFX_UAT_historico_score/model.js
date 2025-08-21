/*CREATE TABLE EQFX_UAT_historico_score (
    idEQFX_UAT_historico_score INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    retroactivo VARCHAR(50) DEFAULT '' ,
    score INT DEFAULT 0,
    g_min DECIMAL(18,2) DEFAULT 0.00,
    g_max DECIMAL(18,2) DEFAULT 0.00,
    y_min DECIMAL(18,2) DEFAULT 0.00,
    y_max DECIMAL(18,2) DEFAULT 0.00,
    r_min DECIMAL(18,2) DEFAULT 0.00,
    r_max DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_historico_score = new EntitySchema({
    name: 'EQFX_UAT_historico_score',
    tableName: 'EQFX_UAT_historico_score',
    target: class EQFX_UAT_historico_score {
        constructor() {
            this.idEQFX_UAT_historico_score = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.retroactivo = '';
            this.score = 0;
            this.g_min = 0.00;
            this.g_max = 0.00;
            this.y_min = 0.00;
            this.y_max = 0.00;
            this.r_min = 0.00;
            this.r_max = 0.00;
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_historico_score: {
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
        score: {
            type: 'int',
            default: 0
        },
        g_min: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        g_max: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        y_min: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        y_max: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        r_min: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        r_max: {
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

module.exports = EQFX_UAT_historico_score;
