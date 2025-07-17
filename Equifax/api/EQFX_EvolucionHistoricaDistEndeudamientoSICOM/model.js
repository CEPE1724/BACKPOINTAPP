// models/Usuario.js

const { EntitySchema } = require('typeorm');

const EQFX_EvolucionHistoricaDistEndeudamientoSICOM = new EntitySchema({
    name: 'EQFX_EvolucionHistoricaDistEndeudamientoSICOM',
    tableName: 'EQFX_EvolucionHistoricaDistEndeudamientoSICOM',
    target: class EQFX_EvolucionHistoricaDistEndeudamientoSICOM {
        constructor() {
            this.idEQFX_EvolucionHistoricaDistEndeudamientoSICOM = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = '';
            this.NOM_INSTITUCION = '';
            this.TIPO_DEUDOR = '';
            this.VAL_X_VENCER = 0;
            this.VAL_VENCIDO = 0;
            this.VAL_NDI = 0;
            this.VAL_DEM_JUDICIAL = 0;
            this.VAL_CART_CASTIGADA = 0;
            this.NUM_DIAS_VENCIDO_ACTUALIZADO = 0;
        }
    },
    columns: {
        idEQFX_EvolucionHistoricaDistEndeudamientoSICOM: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        FechaCorte: {
            type: 'varchar',
            length: 15
        },
        NOM_INSTITUCION: {
            type: 'varchar',
            length: 200
        },
        TIPO_DEUDOR: {
            type: 'varchar',
            length: 15
        },
        VAL_X_VENCER: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        VAL_VENCIDO: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        VAL_NDI: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        VAL_DEM_JUDICIAL: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        VAL_CART_CASTIGADA: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        NUM_DIAS_VENCIDO_ACTUALIZADO: {
            type: 'int'
        }
    }
});

module.exports = EQFX_EvolucionHistoricaDistEndeudamientoSICOM;