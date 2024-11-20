
const { EntitySchema } = require('typeorm');

const EQFX_EvolucionHistoricaDistEndeudamientoEducativo = new EntitySchema({
    name: 'EQFX_EvolucionHistoricaDistEndeudamientoEducativo',
    tableName: 'EQFX_EvolucionHistoricaDistEndeudamientoEducativo',
    target: class EQFX_EvolucionHistoricaDistEndeudamientoEducativo {
        constructor() {
            this.idEQFX_EvolucionHistoricaDistEndeudamientoEducativo = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.FechaCorteParam = new Date();
            this.CodigoInstitucionParam = 0;
            this.Institucion = '';
            this.TipoCreditoParam = '';
            this.TipoCredito = '';
            this.SaldoDeuda = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.Titular = 0;
            this.Garante = 0;
            this.Codeudor = 0;
            this.TarjetaCredito = 0;
            this.AcuerdoConcordatorio = '';
            this.Detalle = '';
            this.ResaltadaInv = '';
        }
    },
    columns: {
        idEQFX_EvolucionHistoricaDistEndeudamientoEducativo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        FechaCorte: {
            type: 'datetime'
        },
        FechaCorteParam: {
            type: 'datetime'
        },
        CodigoInstitucionParam: {
            type: 'int'
        },
        Institucion: {
            type: 'varchar',
            length: 100
        },
        TipoCreditoParam: {
            type: 'char',
            length: 1
        },
        TipoCredito: {
            type: 'varchar',
            length: 50
        },
        SaldoDeuda: {
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
        Titular: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Garante: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Codeudor: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        TarjetaCredito: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        AcuerdoConcordatorio: {
            type: 'char',
            length: 1
        },
        Detalle: {
            type: 'char',
            length: 3
        },
        ResaltadaInv: {
            type: 'char',
            length: 1
        }
    }
});

module.exports = EQFX_EvolucionHistoricaDistEndeudamientoEducativo;