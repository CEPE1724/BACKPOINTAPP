/* CREATE TABLE [dbo].[Pagados](
    [idPagados] [int] IDENTITY(1,1) NOT NULL,
    [Fecha] [datetime] NULL,
    [Estado] [int] NULL,
    [Numero] [varchar](20) NULL,
    [Cedula] [varchar](15) NULL,
    [Cliente] [varchar](100) NULL,
    [Monto] [decimal](18, 2) NULL, */

const { EntitySchema } = require('typeorm')
const Pagados = new EntitySchema({
  name: 'Pagados',
  tableName: 'Pagados',
  target: class Pagados {
    constructor() {
      this.idPagados = undefined
      this.Estado = 0
      this.Numero = ''
      this.Cedula = ''
      this.Cliente = ''
      this.Monto = 0.0
      this.Vendedor = ''
    }
  },

  columns: {
    idPagados: {
      primary: true,
      type: 'int',
      generated: true
    },
    Estado: {
      type: 'int',
      nullable: true
    },
    Numero: {
      type: 'varchar',
      length: 20,
      nullable: true
    },
    Cedula: {
      type: 'varchar',
      length: 15,
      nullable: true
    },
    Cliente: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    Monto: {
      type: 'decimal',
      precision: 18,
      scale: 2,
      nullable: true
    },
    Vendedor: {
      type: 'varchar',
      length: 15,
      nullable: true
    }
  }
})

module.exports = Pagados
