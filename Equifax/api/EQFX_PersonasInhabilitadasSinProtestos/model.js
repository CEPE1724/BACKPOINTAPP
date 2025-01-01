
// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_PersonasInhabilitadasSinProtestos = new EntitySchema({
    name: 'EQFX_PersonasInhabilitadasSinProtestos',
    tableName: 'EQFX_PersonasInhabilitadasSinProtestos',
    target: class EQFX_PersonasInhabilitadasSinProtestos {
        constructor() {
            this.idEQFX_PersonasInhabilitadasSinProtestos = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.NumeroDocumentoInv = '';
            this.NombreSujetoInv = '';
            this.FechaInhabilitacion = new Date();
            this.TiempoInhabilitacion = 0;
            this.Accion = '';
            this.MotivoInv = '';
            this.CodigoInhabilitado = '';
            this.NumeroProtestos = 0;
        }
    },
    columns: {
        idEQFX_PersonasInhabilitadasSinProtestos: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        NumeroDocumentoInv: {
            type: 'varchar',
            length: 13
        },
        NombreSujetoInv: {
            type: 'varchar',
            length: 80
        },
        FechaInhabilitacion: {
            type: 'datetime'
        },
        TiempoInhabilitacion: {
            type: 'int'
        },
        Accion: {
            type: 'varchar',
            length: 100
        },
        MotivoInv: {
            type: 'varchar',
            length: 200
        },
        CodigoInhabilitado: {
            type: 'varchar',
            length: 2
        },
        NumeroProtestos: {
            type: 'int'
        }
    }
});

module.exports = EQFX_PersonasInhabilitadasSinProtestos;