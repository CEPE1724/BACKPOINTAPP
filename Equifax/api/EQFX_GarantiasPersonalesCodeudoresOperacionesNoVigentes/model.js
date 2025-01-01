
const { EntitySchema } = require('typeorm');

const EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes = new EntitySchema({
    name: 'EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes',
    tableName: 'EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes',
    target: class EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes {

        constructor() {
            this.idEQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.TipoDeudor = '';
            this.FechaConcesion = new Date();
            this.FechaEliminacion = new Date();
            this.NumeroDocumento = '';
            this.NombreSujeto = '';
            this.Institucion = '';
            this.NumeroOperacion = '';
            this.ValorOperacion = 0;
            this.FechaCancelacion = new Date();
            this.FechaCorteInv = new Date();
        }
    },

    columns: {
        idEQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        TipoDeudor: {
            type: 'varchar',
            length: 60
        },
        FechaConcesion: {
            type: 'datetime'
        },
        FechaEliminacion: {
            type: 'datetime'
        },
        NumeroDocumento: {
            type: 'varchar',
            length: 13
        },
        NombreSujeto: {
            type: 'varchar',
            length: 300
        },
        Institucion: {
            type: 'varchar',
            length: 60
        },
        NumeroOperacion: {
            type: 'varchar',
            length: 22
        },
        ValorOperacion: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        FechaCancelacion: {
            type: 'datetime'
        },
        FechaCorteInv: {
            type: 'datetime'
        }
    }
});

module.exports = EQFX_GarantiasPersonalesCodeudoresOperacionesNoVigentes;