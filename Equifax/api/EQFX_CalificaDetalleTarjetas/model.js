
const { EntitySchema } = require('typeorm');

const EQFX_CalificaDetalleTarjetas = new EntitySchema({
    name: 'EQFX_CalificaDetalleTarjetas',
    tableName: 'EQFX_CalificaDetalleTarjetas',
    target: class EQFX_CalificaDetalleTarjetas {

        constructor() {
            this.idEQFX_CalificaDetalleTarjetas = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Institucion = '';
            this.Emisor = '';
            this.Antiguedad = 0;
            this.Cupo = 0;
            this.SaldoActual = 0;
            this.SaldoPromedioUltimos6Meses = 0;
            this.PorcentajeUsoTarjeta = 0;
            this.PorcentajeRelacionDeudaTCDeudaTotal = 0;
            this.NumeroTarjetaInv = '';
        }
    } ,
     
    columns: {
        idEQFX_CalificaDetalleTarjetas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        Institucion: {
            type: 'varchar',
            length: 60,
            default: ''
        },
        Emisor: {
            type: 'varchar',
            length: 30,
            default: ''
        },
        Antiguedad: {
            type: 'int',
            default: 0
        },
        Cupo: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        SaldoActual: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        SaldoPromedioUltimos6Meses: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        PorcentajeUsoTarjeta: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        PorcentajeRelacionDeudaTCDeudaTotal: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        NumeroTarjetaInv: {
            type: 'varchar',
            length: 22,
            default: ''
        }
    }
});

module.exports = EQFX_CalificaDetalleTarjetas;