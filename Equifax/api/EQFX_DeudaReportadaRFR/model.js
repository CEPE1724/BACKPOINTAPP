
const { EntitySchema } = require('typeorm');

const EQFX_DeudaReportadaRFR = new EntitySchema({
    name: 'EQFX_DeudaReportadaRFR',
    tableName: 'EQFX_DeudaReportadaRFR',
    target: class EQFX_DeudaReportadaRFR {
        constructor() {
            this.idEQFX_DeudaReportadaRFR = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = '';
            this.Institucion = '';
            this.TipoDeudor = '';
            this.CodTipoCreditoInv = '';
            this.TipoCredito = '';
            this.Calificacion = '';
            this.PorVencer = 0;
            this.NoDevengaInt = 0;
            this.Vencido = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.Total = 0;
            this.DiasVencido = 0;
            this.MayorPlazoVencidoInv = '';
            this.SaldoTotalInv = 0;
            this.CodTipoDeudorInv = '';
            this.NumeroDocumentoInv = '';
            this.NombreSujetoInv = '';
            this.CodigoInstitucionInv = 0;
          
        }
    },
    columns: {
        idEQFX_DeudaReportadaRFR: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        FechaCorte: {
            type: 'varchar',
            length: 10
        },
        Institucion: {
            type: 'varchar',
            length: 200
        },
        TipoDeudor: {
            type: 'varchar',
            length: 15
        },
        CodTipoCreditoInv: {
            type: 'varchar',
            length: 1
        },
        TipoCredito: {
            type: 'varchar',
            length: 20
        },
        Calificacion: {
            type: 'varchar',
            length: 1
        },
        PorVencer: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        NoDevengaInt: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        DemandaJudicial: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        CarteraCastigada: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Total: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        DiasVencido: {
            type: 'int'
        },
        MayorPlazoVencidoInv: {
            type: 'varchar',
            length: 20
        },
        SaldoTotalInv: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        CodTipoDeudorInv: {
            type: 'varchar',
            length: 1
        },
        NumeroDocumentoInv: {
            type: 'varchar',
            length: 13
        },
        NombreSujetoInv: {
            type: 'varchar',
            length: 150
        },
        CodigoInstitucionInv: {
            type: 'int'
        },
    }
});

module.exports = EQFX_DeudaReportadaRFR;