// models/Usuario.js


const { EntitySchema } = require('typeorm');

const EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes = new EntitySchema({
    name: 'EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes',
    tableName: 'EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes',
    target: class EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes {
        constructor() {
            this.idEQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.TipoDeudor = '';
            this.NombreTitular = '';
            this.IdentificacionTitular = '';
            this.NumeroOperacion = '';
            this.Institucion = '';
            this.DeudaTotal = 0;
            this.CodigoInstitucionParam = 0;
            this.OperacionParam = '';
            this.CodigoTipoDeudorParam = '';
            this.TipoDocumentoTitularParam = '';
            this.NumeroDocumentoTitularParam = '';
            this.FechaCorteParam = new Date();
        }
    },
    columns: {
        idEQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes: {
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
        NombreTitular: {
            type: 'varchar',
            length: 300
        },
        IdentificacionTitular: {
            type: 'varchar',
            length: 13
        },
        NumeroOperacion: {
            type: 'varchar',
            length: 22
        },
        Institucion: {
            type: 'varchar',
            length: 60
        },
        DeudaTotal: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        CodigoInstitucionParam: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        OperacionParam: {
            type: 'varchar',
            length: 22
        },
        CodigoTipoDeudorParam: {
            type: 'varchar',
            length: 1
        },
        TipoDocumentoTitularParam: {
            type: 'varchar',
            length: 1
        },
        NumeroDocumentoTitularParam: {
            type: 'varchar',
            length: 13
        },
        FechaCorteParam: {
            type: 'datetime'
        }
    }
});

module.exports = EQFX_RecursivoGarantiasPersonalesCodeudoresOperacionesVigentes;