// models/Usuario.js

const { EntitySchema } = require('typeorm');

const EQFX_DeudaTotalSICOM = new EntitySchema({
    name: 'EQFX_DeudaTotalSICOM',
    tableName: 'EQFX_DeudaTotalSICOM',
    target: class EQFX_DeudaTotalSICOM {
        constructor() {
            this.idEQFX_DeudaTotalSICOM = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.Titulo = '';
            this.TituloWSInv = '';
            this.PorVencer = 0;
            this.NoDevengaInt = 0;
            this.Vencido = 0;
            this.Total = 0;
            this.DemandaJudicial = 0;
            this.CarteraCastigada = 0;
        }
    },
    columns: {
        idEQFX_DeudaTotalSICOM: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        Titulo: {
            type: 'varchar',
            length: 50
        },
        TituloWSInv: {
            type: 'varchar',
            length: 50
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
        Total: {
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
    }
});

module.exports = EQFX_DeudaTotalSICOM;