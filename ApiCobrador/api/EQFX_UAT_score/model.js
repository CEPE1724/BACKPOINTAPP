/*CREATE TABLE EQFX_UAT_score (
    idEQFX_UAT_score INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    score INT DEFAULT 0,
    total_acum DECIMAL(18,2) DEFAULT 0.00,
    tasa_de_malos_acum DECIMAL(18,2) DEFAULT 0.00,
    score_min INT DEFAULT 0,
    score_max INT DEFAULT 0,
    fecha_inicial DATE NULL,
    fecha_final DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_score = new EntitySchema({
    name: 'EQFX_UAT_score',
    tableName: 'EQFX_UAT_score',
    target: class EQFX_UAT_score {
        constructor() {
            this.idEQFX_UAT_score = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.score = 0;
            this.total_acum = 0.00;
            this.tasa_de_malos_acum = 0.00;
            this.score_min = 0;
            this.score_max = 0;
            this.fecha_inicial = null;
            this.fecha_final = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_score: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        score: {
            type: 'int',
            default: 0
        },
        total_acum: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        tasa_de_malos_acum: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        score_min: {
            type: 'int',
            default: 0
        },
        score_max: {
            type: 'int',
            default: 0
        },
        fecha_inicial: {
            type: 'date',
            nullable: true
        },
        fecha_final: {
            type: 'date',
            nullable: true
        },
        FechaSistema: {
            type: 'datetime',
            createDate: true
        }
    }
});

module.exports =  EQFX_UAT_score ;