

const { columns } = require('mssql');
const { EntitySchema } = require('typeorm');

const EQFX_IndicadoresDeudaActualSbsSicomRfr = new EntitySchema({
    name: 'EQFX_IndicadoresDeudaActualSbsSicomRfr',
    tableName: 'EQFX_IndicadoresDeudaActualSbsSicomRfr',
    target: class EQFX_IndicadoresDeudaActualSbsSicomRfr {
        constructor() {
            this.idEQFX_IndicadoresDeudaActualSbsSicomRfr = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = "";
            this.Segmento = "";
            this.Institucion = "";
            this.TipoDeudor = "";
            this.TipoCredito = "";
            this.Calificacion = "";
            this.PorVencer = 0;
            this.NoDevengaInt = 0;
            this.Vencido = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.Total = 0;
            this.DiasVencido = "";

        }
    },
    columns : {
        idEQFX_IndicadoresDeudaActualSbsSicomRfr: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Segmento: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        Institucion: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        TipoDeudor: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        TipoCredito: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        Calificacion: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        PorVencer: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        NoDevengaInt: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        DemandaJudicial: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        CarteraCastigada: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Total: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        DiasVencido: {
            type: 'varchar',
            length: 50,
            default: ''
        }
    }
});

module.exports = EQFX_IndicadoresDeudaActualSbsSicomRfr;

