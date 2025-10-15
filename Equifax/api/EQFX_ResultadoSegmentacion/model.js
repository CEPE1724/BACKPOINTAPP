

const { EntitySchema } = require('typeorm');

const EQFX_ResultadoSegmentacion = new EntitySchema({
    name: 'EQFX_ResultadoSegmentacion',
    tableName: 'EQFX_ResultadoSegmentacion',
    target: class EQFX_ResultadoSegmentacion {
        constructor() {
            this.idEQFX_ResultadoSegmentacion = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.ResultadoEvaluacion = 0;
            this.SegmentacionCliente = '';
            this.Ingresos = 0;
            this.GastoHogar = 0;
            this.GastoFinanciero = 0;
            this.RangoIngresos = '';
            this.CapacidaddePago = 0;
            this.Edad = 0;
            this.ModeloUtilizado = '';
            this.ScoreTitular = '';
            this.ScoreSobreendeudamiento = '';
        }
    },
    columns: {
        idEQFX_ResultadoSegmentacion: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        ResultadoEvaluacion: {
            type: 'int'
        },
        SegmentacionCliente: {
            type: 'varchar',
            length: 50
        },
        Ingresos: {
            type: 'int'
        },
        GastoHogar: {
            type: 'int'
        },
        GastoFinanciero: {
            type: 'int'
        },
        RangoIngresos: {
            type: 'varchar',
            length: 50
        },
        CapacidaddePago: {
            type: 'int'
        },
        Edad: {
            type: 'int'
        },
        ModeloUtilizado: {
            type: 'varchar',
            length: 50
        },
        ScoreTitular: {
            type: 'varchar',
            length: 50
        },
        ScoreSobreendeudamiento: {
            type: 'varchar',
            length: 50
        }
    }
});

module.exports = EQFX_ResultadoSegmentacion;


           

