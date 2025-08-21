/*CREATE TABLE EQFX_UAT_resultado_politicas (
    idEQFX_UAT_resultado_politicas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_UAT_resultado_segmentacion INT NOT NULL,
    politica NVARCHAR(255) DEFAULT '' ,
    valor NVARCHAR(255) DEFAULT '' ,
    decision NVARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE(),
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_resultado_politicas = new EntitySchema({
    name: 'EQFX_UAT_resultado_politicas',
    tableName: 'EQFX_UAT_resultado_politicas',
    target: class EQFX_UAT_resultado_politicas {
        constructor() {
            this.idEQFX_UAT_resultado_politicas = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.politica = "";
            this.valor = "";
            this.decision = "";
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_resultado_politicas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        politica: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        valor: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        decision: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
    }
});
module.exports = EQFX_UAT_resultado_politicas;
