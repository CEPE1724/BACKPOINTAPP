/*CREATE TABLE EQFX_UAT_detalle_tarjetas (
    idEQFX_UAT_detalle_tarjetas INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    institucion VARCHAR(255) DEFAULT '' ,
    emisor VARCHAR(255) DEFAULT '' ,
    antiguedad INT DEFAULT 0,
    cupo DECIMAL(18,2) DEFAULT 0.00,
    saldo_actual DECIMAL(18,2) DEFAULT 0.00,
    saldo_promedio_ultimos_6_meses DECIMAL(18,2) DEFAULT 0.00,
    porcentaje_uso_tarjeta DECIMAL(5,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_detalle_tarjetas = new EntitySchema({
    name: 'EQFX_UAT_detalle_tarjetas',
    tableName: 'EQFX_UAT_detalle_tarjetas',
    target: class EQFX_UAT_detalle_tarjetas {
        constructor() {
            this.idEQFX_UAT_detalle_tarjetas = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.institucion = '';
            this.emisor = '';
            this.antiguedad = 0;
            this.cupo = 0.00;
            this.saldo_actual = 0.00;
            this.saldo_promedio_ultimos_6_meses = 0.00;
            this.porcentaje_uso_tarjeta = 0.00;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_detalle_tarjetas: {
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
            default: "''"
        },
        emisor: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        antiguedad: {
            type: 'int',
            default: 0
        },
        cupo: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_actual: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_promedio_ultimos_6_meses: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        porcentaje_uso_tarjeta: {
            type: 'decimal',
            precision: 5,
            scale: 2,
            default: 0.00
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'GETDATE()'
        }
    }
});
module.exports = EQFX_UAT_detalle_tarjetas ;
