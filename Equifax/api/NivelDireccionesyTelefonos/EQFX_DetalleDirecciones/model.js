
const { EntitySchema } = require('typeorm');

const EQFX_DetalleDirecciones = new EntitySchema({
    name: 'EQFX_DetalleDirecciones',
    tableName: 'EQFX_DetalleDirecciones',
    target: class EQFX_DetalleDirecciones {
                    
                    constructor() {
                        this.idEQFX_DetalleDirecciones = undefined;
                        this.idEQFX_IdentificacionConsultada = 0;
                        this.Direccion = '';
                    } 
                },
    columns: {
        idEQFX_DetalleDirecciones: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        Direccion: {
            type: 'varchar',
            length: 457,
            default: ''
        }
    }
});

module.exports = EQFX_DetalleDirecciones;


        