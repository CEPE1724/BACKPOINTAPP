
const { EntitySchema } = require('typeorm');

const EQFX_RecursivoAnalisisOperacionesDeudaHistorica = new EntitySchema({
    name: 'EQFX_RecursivoAnalisisOperacionesDeudaHistorica',
    tableName: 'EQFX_RecursivoAnalisisOperacionesDeudaHistorica',
    target: class EQFX_RecursivoAnalisisOperacionesDeudaHistorica {
                
                constructor() {
                    this.idEQFX_RecursivoAnalisisOperacionesDeudaHistorica = undefined;
                    this.idEQFX_IdentificacionConsultada = 0;
                    this.FechaCorte = new Date();
                    this.Operacion = '';
                    this.FechaOperacion = new Date();
                    this.Institucion = '';
                    this.TipoDeudor = '';
                    this.TipoCredito = '';
                    this.Calificacion = '';
                    this.CalificacionHomologada = '';
                    this.ValorTotal = 0;
                    this.ValorTotalPorVencer = 0;
                    this.ValorTotalNdi = 0;
                    this.ValorVencido0_1 = 0;
                    this.ValorVencido1_2 = 0;
                    this.ValorVencido2_3 = 0;
                    this.ValorVencido3_6 = 0;
                    this.ValorVencido6_9 = 0;
                    this.ValorVencido9_12 = 0;
                    this.ValorVencido12_24 = 0;
                    this.ValorVencido24_36 = 0;
                    this.ValorVencido36 = 0;
                    this.ValorDemandaJudicial = 0;
                    this.ValorCarteraCastigada = 0;
                    this.ValorVencidoInv = 0;
                    this.OperacionParam = '';
                    this.CodigoInstitucionParam = 0;
                    this.TipoDocumentoParam = '';
                    this.NumeroDocumentoParam = '';
                    this.TipoRegistroParam = '';
                    this.CodigoTarjetaParam = 0;
                    this.CodigoTcParam = '';
                    this.FechaCorteParam = new Date();
                    this.FechaInv = new Date();
                    this.CodigoTipoDeudorParam = '';
                    this.FechaTablaInv = new Date();
                    this.AcuerdoConcordatorio = '';
                } 
            },
    columns: {
        idEQFX_RecursivoAnalisisOperacionesDeudaHistorica: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'datetime',
            default: 'getdate()'
        },
        Operacion: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        FechaOperacion: {
            type: 'datetime',
            default: 'getdate()'
        },
        Institucion: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        TipoDeudor: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        TipoCredito: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        Calificacion: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        CalificacionHomologada: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        ValorTotal: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorTotalPorVencer: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorTotalNdi: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido0_1: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido1_2: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido2_3: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido3_6: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido6_9: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido9_12: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido12_24: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido24_36: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencido36: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorDemandaJudicial: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorCarteraCastigada: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        ValorVencidoInv: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        OperacionParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        CodigoInstitucionParam: {
            type: 'int',
            default: 0
        },
        TipoDocumentoParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        NumeroDocumentoParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        TipoRegistroParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        CodigoTarjetaParam: {
            type: 'int',
            default: 0
        },
        CodigoTcParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        FechaCorteParam: {
            type: 'datetime',
            default: 'getdate()'
        },
        FechaInv: {
            type: 'datetime',
            default: 'getdate()'
        },
        CodigoTipoDeudorParam: {
            type: 'varchar',
            length: 80,
            default: ''
        },
        FechaTablaInv: {
            type: 'datetime',
            default: 'getdate()'
        },
        AcuerdoConcordatorio: {
            type: 'varchar',
            length: 80,
            default: ''
        }
    }
});

module.exports = EQFX_RecursivoAnalisisOperacionesDeudaHistorica;

