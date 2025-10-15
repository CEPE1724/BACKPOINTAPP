
const { EntitySchema } = require('typeorm');

const EQFX_EvolucionHistoricaDistEndeudamientoRFR = new EntitySchema({
    name: 'EQFX_EvolucionHistoricaDistEndeudamientoRFR',
    tableName: 'EQFX_EvolucionHistoricaDistEndeudamientoRFR',
    target: class EQFX_EvolucionHistoricaDistEndeudamientoRFR {
        constructor() {
            this.idEQFX_EvolucionHistoricaDistEndeudamientoRFR = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = '';
            this.NOM_INSTITUCION = '';
            this.NOM_TIPO_CRED = '';
            this.TIPO_DEUDOR = '';
            this.COD_CALIFICACION_ORIGEN = '';
            this.VAL_X_VENCER = 0;
            this.VAL_VENCIDO = 0;
            this.VAL_NDI = 0;
            this.VAL_DEM_JUDICIAL = 0;
            this.VAL_CART_CASTIGADA = 0;
            this.NUM_DIAS_VENCIDO_ACTUALIZADO = 0;
        }
    },
    columns: {
        idEQFX_EvolucionHistoricaDistEndeudamientoRFR: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'varchar',
            default: ''
        },
        NOM_INSTITUCION: {
            type: 'varchar',
            default: ''
        },
        NOM_TIPO_CRED: {
            type: 'varchar',
            default: ''
        },
        TIPO_DEUDOR: {
            type: 'varchar',
            default: ''
        },
        COD_CALIFICACION_ORIGEN: {
            type: 'varchar',
            default: ''
        },
        VAL_X_VENCER: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        VAL_VENCIDO: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        VAL_NDI: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        VAL_DEM_JUDICIAL: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        VAL_CART_CASTIGADA: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        NUM_DIAS_VENCIDO_ACTUALIZADO: {
            type: 'int',
            default: 0
        }
    }
});

module.exports = EQFX_EvolucionHistoricaDistEndeudamientoRFR;

    