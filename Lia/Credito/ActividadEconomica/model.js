const { EntitySchema } = require('typeorm')

const ActividadEconomica = new EntitySchema({
  name: 'ActividadEconomica',
  tableName: 'Cre_ActividadEconomica',
  target: class ActividadEconomica {},
  columns: {
    idActEconomica: {
      primary: true,
      type: 'int',
      generated: true
    },
    Codigo: {
      type: 'varchar',
      length: 20,
      nullable: false
    },
    FuenIngrs: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    Nombre: {
      type: 'varchar',
      length: 100,
      nullable: false
    },
    CodPichincha: {
      type: 'varchar',
      length: 20,
      nullable: true
    },
    idEntidadFinanciera: {
      type: 'int',
      nullable: false
    },
    idFuenteIngreso: {
      type: 'int',
      nullable: false
    },
    Codigo_BA: {
      type: 'varchar',
      length: 20,
      nullable: true
    },
    Tipo: {
      type: 'int',
      nullable: false
    }
  }
})

module.exports = ActividadEconomica
