

const { EntitySchema } = require('typeorm');

const EQFX_EvolucionHistoricaDistEndeudamientoRecursivo = new EntitySchema({
    name: 'EQFX_EvolucionHistoricaDistEndeudamientoRecursivo',
    tableName: 'EQFX_EvolucionHistoricaDistEndeudamientoRecursivo',
    target: class EQFX_EvolucionHistoricaDistEndeudamientoRecursivo {
        constructor() {
            this.idEQFX_EvolucionHistoricaDistEndeudamientoRecursivo = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.FechaCorteParam = new Date();
            this.PorVencer = 0;
            this.NoDevengaInt = 0;
            this.Vencido0a1 = 0;
            this.Vencido1a2 = 0;
            this.Vencido2a3 = 0;
            this.Vencido3a6 = 0;
            this.Vencido6a9 = 0;
            this.Vencido9a12 = 0;
            this.Vencido12a24 = 0;
            this.Vencido24 = 0;
            this.Vencido36 = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.SaldoDeuda = 0;
            this.tipoDeudaParam = '';
        }
    },

    columns: {
        idEQFX_EvolucionHistoricaDistEndeudamientoRecursivo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'datetime',
            default: () => 'GETDATE()'
        },
        FechaCorteParam: {
            type: 'datetime',
            default: () => 'GETDATE()'
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
        Vencido0a1: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido1a2: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido2a3: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido3a6: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido6a9: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido9a12: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido12a24: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido24: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        Vencido36: {
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
        SaldoDeuda: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        tipoDeudaParam: {
            type: 'varchar',
            length: 10,
            default: ''
        }
    }
});

module.exports = EQFX_EvolucionHistoricaDistEndeudamientoRecursivo;