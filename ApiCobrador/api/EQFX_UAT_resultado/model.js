/*CREATE TABLE EQFX_UAT_resultado (
    idEQFX_UAT_resultado INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    variable NVARCHAR(255) DEFAULT '' ,
    resultado NVARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);
    
*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_resultado = new EntitySchema({
    name: 'EQFX_UAT_resultado',
    tableName: 'EQFX_UAT_resultado',
    target: class EQFX_UAT_resultado {
        constructor() {
            this.idEQFX_UAT_resultado = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.variable = "";
            this.resultado = "";
            this.FechaSistema = new Date();
        }
    }
    ,
    columns: {
        idEQFX_UAT_resultado: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        variable: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        resultado: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_resultado;

