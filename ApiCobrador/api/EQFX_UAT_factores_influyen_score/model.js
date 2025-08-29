/*CREATE TABLE EQFX_UAT_factores_influyen_score (
    idEQFX_UAT_factores_influyen_score INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    numero_operaciones_historicas INT DEFAULT 0,
    numero_operaciones_vigentes INT DEFAULT 0,
    numero_operaciones_vencidas INT DEFAULT 0,
    saldo_por_vencer DECIMAL(18,2) DEFAULT 0.00,
    saldo_vencido DECIMAL(18,2) DEFAULT 0.00,
    saldo_demanada_judicial DECIMAL(18,2) DEFAULT 0.00,
    saldo_cartera_castigada DECIMAL(18,2) DEFAULT 0.00,
    maximo_saldos_vencidos DECIMAL(18,2) DEFAULT 0.00,
    tiempo_trancurrido_primer_credito VARCHAR(100) DEFAULT '' ,
    vencidos_actuales INT DEFAULT 0,
    maximo_dias_vencido INT DEFAULT 0,
    saldo_deuda_nuevos_creditos DECIMAL(18,2) DEFAULT 0.00,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/


const { EntitySchema } = require('typeorm');
const EQFX_UAT_factores_influyen_score = new EntitySchema({
    name: 'EQFX_UAT_factores_influyen_score',
    tableName: 'EQFX_UAT_factores_influyen_score',
    target: class EQFX_UAT_factores_influyen_score {
        constructor() {
            this.idEQFX_UAT_factores_influyen_score = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.numero_operaciones_historicas = 0;
            this.numero_operaciones_vigentes = 0;
            this.numero_operaciones_vencidas = 0;
            this.saldo_por_vencer = 0.00;
            this.saldo_vencido = 0.00;
            this.saldo_demanada_judicial = 0.00;
            this.saldo_cartera_castigada = 0.00;
            this.maximo_saldos_vencidos = 0.00;
            this.tiempo_trancurrido_primer_credito = "''";
            this.vencidos_actuales = 0;
            this.maximo_dias_vencido = 0;
            this.saldo_deuda_nuevos_creditos = 0.00;
            this.FechaSistema = new Date();

        }
    },
    columns: {
        idEQFX_UAT_factores_influyen_score: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        numero_operaciones_historicas: {
            type: 'int',
            default: 0,
        },
        numero_operaciones_vigentes: {
            type: 'int',
            default: 0,
        },
        numero_operaciones_vencidas: {
            type: 'int',
            default: 0,
        },
        saldo_por_vencer: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_vencido: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_demanada_judicial: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        saldo_cartera_castigada: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        maximo_saldos_vencidos: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        tiempo_trancurrido_primer_credito: {
            type: 'varchar',
            length: 100,
            default: "''"
        },
        vencidos_actuales: {
            type: 'int',
            default: 0
        },
        maximo_dias_vencido: {
            type: 'int',
            default: 0
        },
        saldo_deuda_nuevos_creditos: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_factores_influyen_score;