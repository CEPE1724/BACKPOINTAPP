// models/Usuario.js
const { EntitySchema } = require('typeorm');

const EQFX_Ultimas10OperacionesCanceladas = new EntitySchema({
  name: 'EQFX_Ultimas10OperacionesCanceladas',
  tableName: 'EQFX_Ultimas10OperacionesCanceladas',
  target: class EQFX_Ultimas10OperacionesCanceladas {
    constructor() {
      this.idEQFX_Ultimas10OperacionesCanceladas = undefined;
      this.idEQFX_IdentificacionConsultada = 0;
      this.CodigoInstitucionInv = "";  // Cambiado a string
      this.Institucion = "";
      this.NumeroOperaciones = "";
      this.ValorOriginal = 0;  // Cambiado a decimal
      this.CodFormaCancelacionInv = "";
      this.FormaCancelacion = "";
      this.FechaCancelacion = new Date();
    }
  },
  columns: {
    idEQFX_Ultimas10OperacionesCanceladas: {
      primary: true,
      type: 'int',
      generated: true
    },
    idEQFX_IdentificacionConsultada: {
      type: 'int',
      default: 0
    },
    CodigoInstitucionInv: {
      type: 'varchar', // Cambiado a varchar ya que se recibe como string
      length: 10
    },
    Institucion: {
      type: 'varchar',
      length: 60
    },
    NumeroOperaciones: {
      type: 'varchar',
      length: 22
    },
    ValorOriginal: {
      type: 'decimal', // Mantiene tipo decimal
      precision: 12,
      scale: 2,
      default: 0
    },
    CodFormaCancelacionInv: {
      type: 'varchar',
      length: 2
    },
    FormaCancelacion: {
      type: 'varchar',
      length: 40
    },
    FechaCancelacion: {
      type: 'datetime',  // Mantiene el tipo datetime
      default: () => 'GETDATE()'  // Asegúrate de usar un valor por defecto si no se pasa fecha
    }
  }
});

module.exports = EQFX_Ultimas10OperacionesCanceladas;
