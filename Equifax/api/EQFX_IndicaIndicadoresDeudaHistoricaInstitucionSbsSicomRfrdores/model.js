

const { columns } = require('mssql');
const { EntitySchema } = require('typeorm');

const EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores = new EntitySchema({
    name: 'EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores',
    tableName: 'EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores',
    target: class EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores {
        constructor() {
            this.idEQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfr = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.FechaCorte = "";
            this.Segmento = "";
            this.Institucion = "";
            this.TipoRiesgo = "";
            this.TipoCredito = "";
            this.Calificacion = "";
            this.MayorValorVencido = 0;
            this.FechaMayorValor = "";
            this.MayorPlazoVencido = "";
            this.FechaMayorPlazo = "";
            this.FechaUltimoVencido = "";
            this.Operacion = "";
        }
    },
    columns : {
        idEQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfr: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        FechaCorte: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Segmento: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        Institucion: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        TipoRiesgo: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        TipoCredito: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        Calificacion: {
            type: 'varchar',
            length: 1,
            default: ''
        },
        MayorValorVencido: {
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0
        },
        FechaMayorValor: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        MayorPlazoVencido: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        FechaMayorPlazo: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        FechaUltimoVencido: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Operacion: {
            type: 'varchar',
            length: 20,
            default: ''
        }
    }
});

module.exports = EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores;