
// Version: 1.0
const { EntitySchema } = require('typeorm');

const EQFX_DetalleTelefonos = new EntitySchema({
    name: 'EQFX_DetalleTelefonos',
    tableName: 'EQFX_DetalleTelefonos',
    target: class EQFX_DetalleTelefonos {
                        
                        constructor() {
                            this.idEQFX_DetalleTelefonos = undefined;
                            this.idEQFX_IdentificacionConsultada = 0;
                            this.telefono = '';
                        } 
                    },
    columns: {
        idEQFX_DetalleTelefonos: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        telefono: {
            type: 'varchar',
            length: 100,
            default: ''
        }
    }
});

module.exports = EQFX_DetalleTelefonos;