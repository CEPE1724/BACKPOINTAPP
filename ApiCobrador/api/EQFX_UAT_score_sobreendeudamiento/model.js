/*CREATE  TABLE EQFX_UAT_score_sobreendeudamiento (
    idEQFX_UAT_score_sobreendeudamiento INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    score INT DEFAULT 0,
    rango_score VARCHAR(50) DEFAULT '' ,
    segmentacion VARCHAR(50) DEFAULT '' ,
    porcentaje DECIMAL(18,2) DEFAULT 0.00,
    probabilidad_sobre_endeudamiento DECIMAL(18,2) DEFAULT 0.00,
    fecha_inicial DATE NULL,
    fecha_final DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_score_sobreendeudamiento = new EntitySchema({
    name: 'EQFX_UAT_score_sobreendeudamiento',
    tableName: 'EQFX_UAT_score_sobreendeudamiento',
    target: class EQFX_UAT_score_sobreendeudamiento {
        constructor() {
            this.idEQFX_UAT_score_sobreendeudamiento = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.score = 0;
            this.rango_score = '';
            this.segmentacion = '';
            this.porcentaje = 0.00;
            this.probabilidad_sobre_endeudamiento = 0.00;
            this.fecha_inicial = null;
            this.fecha_final = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_score_sobreendeudamiento: {
            type: 'int',
            primary: true,
            generated: true,
            name: 'idEQFX_UAT_score_sobreendeudamiento'
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false,
            name: 'idEQFX_IdentificacionConsultada'
        },
        score: {
            type: 'int',
            default: 0,
            name: 'score'
        },
        rango_score: {
            type: 'varchar',
            length: 50,
            default: '',
            name: 'rango_score'
        },
        segmentacion: {
            type: 'varchar',
            length: 50,
            default: '',
            name: 'segmentacion'
        },
        porcentaje: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00,
            name: 'porcentaje'
        },
        probabilidad_sobre_endeudamiento: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00,
            name: 'probabilidad_sobre_endeudamiento'
        },
        fecha_inicial: {
            type: 'date',
            nullable: true,
            name: 'fecha_inicial'
        },
        fecha_final: {
            type: 'date',
            nullable: true,
            name: 'fecha_final'
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()',
            name: 'FechaSistema'
        }
    }
});

module.exports = EQFX_UAT_score_sobreendeudamiento;