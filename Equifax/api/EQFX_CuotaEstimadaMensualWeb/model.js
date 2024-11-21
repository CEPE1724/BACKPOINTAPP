

const { EntitySchema } = require('typeorm');

const EQFX_CuotaEstimadaMensualWeb = new EntitySchema({
    name: 'EQFX_CuotaEstimadaMensualWeb',
    tableName: 'EQFX_CuotaEstimadaMensualWeb',
    target: class EQFX_CuotaEstimadaMensualWeb {
        constructor() {
            this.idEQFX_CuotaEstimadaMensualWeb = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Pago = 0;
            this.NumeroCreditosComercial = 0;
            this.TotalVencido = 0;
            this.TotalDemanda = 0;
            this.TotalCartera = 0;
            this.NumeroCreditosIece = 0;
            this.NumeroOperacionesExcluidas = 0;
        }
    },

    columns: {
        idEQFX_CuotaEstimadaMensualWeb: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Pago: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        NumeroCreditosComercial: {
            type: 'int'
        },
        TotalVencido: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        TotalDemanda: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        TotalCartera: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        NumeroCreditosIece: {
            type: 'int'
        },
        NumeroOperacionesExcluidas: {
            type: 'int'
        }
    }
});

module.exports = EQFX_CuotaEstimadaMensualWeb;