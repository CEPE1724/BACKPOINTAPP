/*CREATE TABLE EQFX_UAT_mensaje_califica_detalle_tarjetas (
    idEQFX_UAT_mensaje_califica_detalle_tarjetas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    mensaje VARCHAR(255) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');   
const EQFX_UAT_mensaje_califica_detalle_tarjetas = new EntitySchema({
    name: 'EQFX_UAT_mensaje_califica_detalle_tarjetas',
    tableName: 'EQFX_UAT_mensaje_califica_detalle_tarjetas',
    target: class EQFX_UAT_mensaje_califica_detalle_tarjetas {
        constructor(idEQFX_UAT_mensaje_califica_detalle_tarjetas, idEQFX_IdentificacionConsultada, mensaje, FechaSistema) {
            this.idEQFX_UAT_mensaje_califica_detalle_tarjetas = idEQFX_UAT_mensaje_califica_detalle_tarjetas;
            this.idEQFX_IdentificacionConsultada = idEQFX_IdentificacionConsultada;
            this.mensaje = mensaje;
            this.FechaSistema = FechaSistema;
        }
    },
    columns: {
        idEQFX_UAT_mensaje_califica_detalle_tarjetas: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        mensaje: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_mensaje_califica_detalle_tarjetas;
