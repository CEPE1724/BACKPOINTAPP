/*CREATE TABLE EQFX_UAT_resumen_informe (
    idEQFX_UAT_resumen_informe INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    monto_total_ope_impagos DECIMAL(18,2) DEFAULT 0.00,
    num_total_ope_impagos INT DEFAULT 0,
    tipo NVARCHAR(100) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_resumen_informe = new EntitySchema({
    name: 'EQFX_UAT_resumen_informe',
    tableName: 'EQFX_UAT_resumen_informe',
    target: class EQFX_UAT_resumen_informe {
        constructor() {
            this.idEQFX_UAT_resumen_informe = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.monto_total_ope_impagos = 0.00;
            this.num_total_ope_impagos = 0;
            this.tipo = "";
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_resumen_informe: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        monto_total_ope_impagos: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        num_total_ope_impagos: {
            type: 'int',
            default: 0
        },
        tipo: {
            type: 'nvarchar',
            length: 100,
            default: ''
        }
    }
});
module.exports = EQFX_UAT_resumen_informe;