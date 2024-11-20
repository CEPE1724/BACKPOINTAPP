
const { EntitySchema } = require('typeorm');

const EQFX_ScorePuntajeyGraficoV3 = new EntitySchema({
    name: 'EQFX_ScorePuntajeyGraficoV3',
    tableName: 'EQFX_ScorePuntajeyGraficoV3',
    target: class EQFX_ScorePuntajeyGraficoV3 {
        constructor() {
            this.idEQFX_ScorePuntajeyGraficoV3 = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Score = 0;
            this.TotalAcum = 0;
            this.TasaDeMalosAcum = 0;
            this.ScoreMin = 0;
            this.ScoreMax = 0;
            this.FechaInicial = new Date();
            this.FechaFinal = new Date();
        }
    },
     columns: {
        idEQFX_ScorePuntajeyGraficoV3: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Score: {
            type: 'int'
        },
        TotalAcum: {
            type: 'int'
        },
        TasaDeMalosAcum: {
            type: 'int'
        },
        ScoreMin: {
            type: 'int'
        },
        ScoreMax: {
            type: 'int'
        },
        FechaInicial: {
            type: 'datetime'
        },
        FechaFinal: {
            type: 'datetime'
        }
    }
});

module.exports = EQFX_ScorePuntajeyGraficoV3;