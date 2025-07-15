const { EntitySchema } = require('typeorm');

const EQFX_AnalisisSaldosPorVencerSistemaFinanciero = new EntitySchema({
    name: 'EQFX_AnalisisSaldosPorVencerSistemaFinanciero',
    tableName: 'EQFX_AnalisisSaldosPorVencerSistemaFinanciero',
    target: class EQFX_AnalisisSaldosPorVencerSistemaFinanciero {

        constructor() {
            this.idEQFX_AnalisisSaldosPorVencerSistemaFinanciero = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.Institucion = '';
            this.CodigoInstitucionInv = 0;
            this.TotalPorVencer = 0;
            this.PorVencer0a1 = 0;
            this.PorVencer1a3 = 0;
            this.PorVencer3a6 = 0;
            this.PorVencer6a12 = 0;
            this.PorVencer12 = 0;
        }
    },

    columns: {
        idEQFX_AnalisisSaldosPorVencerSistemaFinanciero: {
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
        Institucion: {
            type: 'varchar',
            length: 60
        },
        CodigoInstitucionInv: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        TotalPorVencer: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        PorVencer0a1: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        PorVencer1a3: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        PorVencer3a6: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        PorVencer6a12: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        PorVencer12: {
            type: 'decimal',
            precision: 15,
            scale: 2
        }
    }
});

module.exports = EQFX_AnalisisSaldosPorVencerSistemaFinanciero;
