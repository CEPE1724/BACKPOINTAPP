const { EntitySchema } = require('typeorm');

const EQFX_AnalisisDetalleVencido = new EntitySchema({
    name: 'EQFX_AnalisisDetalleVencido',
    tableName: 'EQFX_AnalisisDetalleVencido',
    target: class EQFX_AnalisisDetalleVencido {

        constructor() {
            this.idEQFX_AnalisisDetalleVencido = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = new Date();
            this.CodigoInstitucionInv = '';
            this.Institucion = '';
            this.Vencido0a1 = 0;
            this.Vencido1a2 = 0;
            this.Vencido2a3 = 0;
            this.Vencido3a6 = 0;
            this.Vencido6a9 = 0;
            this.Vencido9a12 = 0;
            this.Vencido12a24 = 0;
            this.Vencido24a36 = 0;
            this.Vencido36 = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
            this.NoDevengaInteresesInv = 0;
            this.TotalVencidoInv = 0;
            this.AcuerdoConcordato = '';
        } 
    },
     
    columns: {
        idEQFX_AnalisisDetalleVencido: {
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
        CodigoInstitucionInv: {
            type: 'varchar',
            length: 5,
            default: ''
        },
        Institucion: {
            type: 'varchar',
            length: 200,
            default: ''
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
        Vencido24a36: {
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
            precision: 15
        },
        NoDevengaInteresesInv: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        TotalVencidoInv: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        AcuerdoConcordato: {
            type: 'char',
            length: 1,
            default: ''
        }
    }
});

module.exports = EQFX_AnalisisDetalleVencido;
