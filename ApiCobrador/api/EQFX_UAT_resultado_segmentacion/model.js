/*CREATE TABLE EQFX_UAT_resultado_segmentacion (
    idEQFX_UAT_resultado_segmentacion INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT DEFAULT 0 NOT NULL,
    resultado_evaluacion NVARCHAR(255) DEFAULT '' ,
    segmentacion_cliente NVARCHAR(255) DEFAULT '' ,
    modelo_utilizado NVARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);
*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_resultado_segmentacion = new EntitySchema({
    name: 'EQFX_UAT_resultado_segmentacion',
    tableName: 'EQFX_UAT_resultado_segmentacion',
    target: class EQFX_UAT_resultado_segmentacion {
        constructor() {
            this.idEQFX_UAT_resultado_segmentacion = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.resultado_evaluacion = "";
            this.segmentacion_cliente = "";
            this.modelo_utilizado = "";
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_resultado_segmentacion: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0,
            nullable: false
        },
        resultado_evaluacion: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        segmentacion_cliente: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
        modelo_utilizado: {
            type: 'nvarchar',
            length: 255,
            default: ''
        },
    }
});

module.exports = EQFX_UAT_resultado_segmentacion;
