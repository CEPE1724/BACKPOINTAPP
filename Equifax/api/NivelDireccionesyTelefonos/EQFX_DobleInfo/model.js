// Version: 1.0
const { EntitySchema } = require('typeorm');

const EQFX_DobleInfo = new EntitySchema({
    name: 'EQFX_DobleInfo',
    tableName: 'EQFX_DobleInfo',
    target: class EQFX_DobleInfo {
                    
                    constructor() {
                        this.idEQFX_DobleInfo = undefined;
                        this.idEQFX_IdentificacionConsultada = 0;
                        this.NombreSujeto = '';
                        this.TipoDocumentoDobleInfo = '';
                        this.NumeroDocumentoDobleInfo = '';
                    } 
                },
    columns: {
        idEQFX_DobleInfo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        NombreSujeto: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        TipoDocumentoDobleInfo: {
            type: 'char',
            length: 1,
            default: ''
        },
        NumeroDocumentoDobleInfo: {
            type: 'char',
            length: 13,
            default: ''
        }
    }
});

module.exports = EQFX_DobleInfo;