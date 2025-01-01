
const { EntitySchema } = require('typeorm');

const EQFX_DetalleDeudaActualReportadaSBS = new EntitySchema({
    name: 'EQFX_DetalleDeudaActualReportadaSBS',
    tableName: 'EQFX_DetalleDeudaActualReportadaSBS',
    target: class EQFX_DetalleDeudaActualReportadaSBS {
        constructor() {
            this.idEQFX_DetalleDeudaActualReportadaSBS = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Institucion = '';
            this.FechaCorte = '';
            this.TipoRiesgo = '';
            this.TipoCredito = '';
            this.CupoMontoOriginal = 0;
            this.FechaApertura = '';
            this.FechaVencimiento = '';
            this.CalifPropia = '';
            this.TotalVencer = 0;
            this.NDI = 0;
            this.TotalVencido = 0;
            this.DemJud = 0;
            this.CartCast = 0;
            this.SaldoDeuda = 0;
            this.CuotaMensual = 0;
        }
    },
     
    columns: {
        idEQFX_DetalleDeudaActualReportadaSBS: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Institucion: {
            type: 'varchar',
            length: 200
        },
        FechaCorte: {
            type: 'varchar',
            length: 10
        },
        TipoRiesgo: {
            type: 'varchar',
            length: 60
        },
        TipoCredito: {
            type: 'varchar',
            length: 25
        },
        CupoMontoOriginal: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        FechaApertura: {
            type: 'varchar',
            length: 10
        },
        FechaVencimiento: {
            type: 'varchar',
            length: 10
        },
        CalifPropia: {
            type: 'varchar',
            length: 1
        },
        TotalVencer: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        NDI: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        TotalVencido: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        DemJud: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        CartCast: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        SaldoDeuda: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        CuotaMensual: {
            type: 'decimal',
            precision: 15,
            scale: 2
        }
    }
});

module.exports = EQFX_DetalleDeudaActualReportadaSBS;
