
const { EntitySchema } = require('typeorm');

const EQFX_CreditosOtorgados12UltimosMesesEducativo = new EntitySchema({
    name: 'EQFX_CreditosOtorgados12UltimosMesesEducativo',
    tableName: 'EQFX_CreditosOtorgados12UltimosMesesEducativo',
    target: class EQFX_CreditosOtorgados12UltimosMesesEducativo {
        constructor() {
            this.idEQFX_CreditosOtorgados12UltimosMesesEducativo = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.CodigoInstitucionInv = '';
            this.Institucion = '';
            this.EstadoOperacion = '';
            this.TipoCredito = '';
            this.ValorOperacion = 0;
            this.Titular = 0;
            this.Codeudor = 0;
            this.Garante = 0;
            this.FechaConcesion = new Date();
            this.FechaVencimiento = new Date();
            this.CodEstadoOpInv = '';
            this.CodTipoCreditoInv = '';
            this.CodTipoDeudorInv = '';
            this.CodCalificacionInv = '';
        }
    }, 
    columns: {
        idEQFX_CreditosOtorgados12UltimosMesesEducativo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int'
        },
        CodigoInstitucionInv: {
            type: 'varchar',
            length: 10
        },
        Institucion: {
            type: 'varchar',
            length: 60
        },
        EstadoOperacion: {
            type: 'varchar',
            length: 40
        },
        TipoCredito: {
            type: 'varchar',
            length: 25
        },
        ValorOperacion: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Titular: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Codeudor: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        Garante: {
            type: 'decimal',
            precision: 15,
            scale: 2
        },
        FechaConcesion: {
            type: 'datetime'
        },
        FechaVencimiento: {
            type: 'datetime'
        },
        CodEstadoOpInv: {
            type: 'varchar',
            length: 1
        },
        CodTipoCreditoInv: {
            type: 'varchar',
            length: 2
        },
        CodTipoDeudorInv: {
            type: 'varchar',
            length: 1
        },
        CodCalificacionInv: {
            type: 'varchar',
            length: 1
        }
    }
});

module.exports = EQFX_CreditosOtorgados12UltimosMesesEducativo;