// models/Usuario.js

const { EntitySchema } = require('typeorm');

const EQFX_DeudaReportadaINFOCOM = new EntitySchema({
    name: 'EQFX_DeudaReportadaINFOCOM',
    tableName: 'EQFX_DeudaReportadaINFOCOM',
    target: class EQFX_DeudaReportadaINFOCOM {
        constructor() {
            this.idEQFX_DeudaReportadaINFOCOM = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Institucion = '';
            this.FechaCorte = new Date();
            this.TipoDeudor = '';
            this.Total = 0;
            this.PorVencer = 0;
            this.NoDevengaInt = 0;
            this.Vencido = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.DiasVencido = 0;
            this.CodigoInstitucionInv = 0;
            this.CodTipoDeudorInv = '';
            this.NumeroDocumentoInv = '';
            this.NombreSujetoInv = '';
        }
    }, 
    columns: {
        idEQFX_DeudaReportadaINFOCOM: {
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
            type: 'datetime'
        },
        TipoDeudor: {
            type: 'varchar',
            length: 15
        },
        Total: {
            type: 'decimal',
            precision: 15,
            scale: 2
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
        DiasVencido: {
            type: 'int'
        },
        CodigoInstitucionInv: {
            type: 'int'
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
        }
    }
});

module.exports = EQFX_DeudaReportadaINFOCOM;

