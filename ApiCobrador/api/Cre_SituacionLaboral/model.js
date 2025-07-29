 const { EntitySchema } = require('typeorm');

    const Cre_SituacionLaboral = new EntitySchema({
        name: 'Cre_SituacionLaboral',
        tableName: 'Cre_SituacionLaboral',
        target: class Cre_SituacionLaboral {
            constructor() {
                this.idSituacionLaboral = undefined;
                this.Codigo = "";
                this.Descripcion = "";
                this.idEntidadFinanciera = 0;
            }
        },

        columns: {
            idSituacionLaboral: {
                primary: true,
                type: 'int',
                generated: true
            },
            Codigo: {
                type: 'varchar',
                length: 10
            },
            Descripcion: {
                type: 'varchar',
                length: 100
            },
            idEntidadFinanciera: {
                type: 'int'
            }
        }
    });
    module.exports = Cre_SituacionLaboral;