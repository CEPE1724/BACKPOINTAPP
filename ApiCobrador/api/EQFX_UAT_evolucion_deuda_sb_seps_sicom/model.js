/*CREATE TABLE EQFX_UAT_evolucion_deuda_sb_seps_sicom (
    idEQFX_UAT_evolucion_deuda_sb_seps_sicom INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_corte DATE NULL,
    total DECIMAL(18,2) DEFAULT 0.00,
    vencidos DECIMAL(18,2) DEFAULT 0.00,
    opcion NVARCHAR(50) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);
*/
const { EntitySchema } = require('typeorm');
const EQFX_UAT_evolucion_deuda_sb_seps_sicom = new EntitySchema({
    name: 'EQFX_UAT_evolucion_deuda_sb_seps_sicom',
    tableName: 'EQFX_UAT_evolucion_deuda_sb_seps_sicom',
    target: class EQFX_UAT_evolucion_deuda_sb_seps_sicom {
        constructor() {
            this.idEQFX_UAT_evolucion_deuda_sb_seps_sicom = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_corte = null;
            this.total = 0.00;
            this.vencidos = 0.00;
            this.opcion = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_evolucion_deuda_sb_seps_sicom: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        fecha_corte: {
            type: 'date',
            nullable: true
        },
        total: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        vencidos: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        opcion: {
            type: 'nvarchar',
            length: 50,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_evolucion_deuda_sb_seps_sicom;