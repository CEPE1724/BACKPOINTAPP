// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_IdentificacionConsultada = new EntitySchema({
    name: 'EQFX_IdentificacionConsultada',
    tableName: 'EQFX_IdentificacionConsultada',
    target: class EQFX_IdentificacionConsultada {
        constructor() {
            this.idEQFX_IdentificacionConsultada  = undefined;
            this.NombreSujeto = "";
            this.TipoDocumento = "";
            this.NumeroDocumento = "";
            this.idReportePadre = 0;
            this.Estacion = "";
            this.Usuario = "";
            this.FechaSistema = "";
        }
    },
    columns: {
        idEQFX_IdentificacionConsultada: {
            primary: true,
            type: 'int',
            generated: true
        },
        NombreSujeto: {
            type: 'varchar',
            length: 200
        },
        TipoDocumento: {
            type: 'char',
            length: 1
        },
        NumeroDocumento: {
            type: 'char',
            length: 10
        },
        Estacion: {
            type: 'varchar',
            length: 50,
            default: () => 'HOST_NAME()'
        },
        Usuario: {
            type: 'varchar',
            length: 50,
            default: () => 'SUSER_NAME()'
        },
        idReportePadre: {
            type: 'int',
            default: 0
        },
        FechaSistema: {
            type: 'datetime',
        }
    }
});

module.exports = EQFX_IdentificacionConsultada;
