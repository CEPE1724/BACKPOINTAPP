
const { EntitySchema } = require('typeorm');

const EQFX_DetalleOperacion = new EntitySchema({
    name: 'EQFX_DetalleOperacion',
    tableName: 'EQFX_DetalleOperacion',
    target: class EQFX_DetalleOperacion {
            
            constructor() {
                this.idEQFX_DetalleOperacion = undefined;
                this.idEQFX_IdentificacionConsultada = 0;
                this.Concepto = '';
                this.Valor = '';
            } 
        },

    columns: {
        idEQFX_DetalleOperacion: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        Concepto: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        Valor: {
            type: 'varchar',
            length: 80,
            default: ''
        }
    }
});

module.exports = EQFX_DetalleOperacion;
