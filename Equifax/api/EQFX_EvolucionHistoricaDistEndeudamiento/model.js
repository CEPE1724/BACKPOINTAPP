
// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_EvolucionHistoricaDistEndeudamiento = new EntitySchema({
    name: 'EQFX_EvolucionHistoricaDistEndeudamiento',
    tableName: 'EQFX_EvolucionHistoricaDistEndeudamiento',
    target: class EQFX_EvolucionHistoricaDistEndeudamiento {
        constructor() {
            this.idEQFX_EvolucionHistoricaDistEndeudamiento = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.Institucion = "";
            this.PorVencer = 0;
            this.Vencido = 0;
            this.NoDevengaInt = 0;
            this.SaldoDeuda = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.CodigoInstitucionParam = 0;
            this.AcuerdoConcordatorio = "";
            this.InstitucionParam = "";
        }
    },

    columns: {
        idEQFX_EvolucionHistoricaDistEndeudamiento: {
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
        Institucion: {
            type: 'varchar',
            length: 60
        },
        PorVencer: {
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
        NoDevengaInt: {
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
        CodigoInstitucionParam: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        AcuerdoConcordatorio: {
            type: 'char',
            length: 1
        },
        InstitucionParam: {
            type: 'varchar',
            length: 60
        }
        
    }
});

module.exports = EQFX_EvolucionHistoricaDistEndeudamiento;
