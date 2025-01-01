

const { EntitySchema } = require('typeorm');

const EQFX_DetalleOperacionesVencidas = new EntitySchema({
    name: 'EQFX_DetalleOperacionesVencidas',
    tableName: 'EQFX_DetalleOperacionesVencidas',
    target: class EQFX_DetalleOperacionesVencidas {
        constructor() {
            this.idEQFX_DetalleOperacionesVencidas = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Titulo = '';
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
            this.Total = 0;
        }
    }
    ,
    columns: {
        idEQFX_DetalleOperacionesVencidas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Titulo: {
            type: 'varchar',
            length: 200
        },
        Vencido0a1: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido1a2: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido2a3: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido3a6: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido6a9: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido9a12: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido12a24: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido24: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Vencido36: {
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
        }
    }
});

module.exports = EQFX_DetalleOperacionesVencidas;