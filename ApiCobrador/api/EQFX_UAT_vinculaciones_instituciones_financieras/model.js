/*CREATE TABLE EQFX_UAT_vinculaciones_instituciones_financieras (
    idEQFX_UAT_vinculaciones_instituciones_financieras INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    vinculacion VARCHAR(255) DEFAULT '' ,
    causal VARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_vinculaciones_instituciones_financieras = new EntitySchema({
    name: 'EQFX_UAT_vinculaciones_instituciones_financieras',
    tableName: 'EQFX_UAT_vinculaciones_instituciones_financieras',
    target: class EQFX_UAT_vinculaciones_instituciones_financieras {
        constructor() {
            this.idEQFX_UAT_vinculaciones_instituciones_financieras = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.vinculacion = '';
            this.causal = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_vinculaciones_instituciones_financieras: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        institucion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        vinculacion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        causal: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_vinculaciones_instituciones_financieras;
