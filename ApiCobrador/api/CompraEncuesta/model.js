 const { EntitySchema } = require('typeorm');

    const CompraEncuesta = new EntitySchema({
        name: 'compraencuesta',
        tableName: 'compraencuesta',
        target: class compraencuesta {
            constructor() {
                this.idCompraEncuesta = undefined;
                this.Descripcion = "";
                this.Estado = 0;
                this.Seleccionar = 0;
            }
        },

        columns: {
            idCompraEncuesta: {
                primary: true,
                type: 'int',
                generated: true
            },
            Descripcion: {
                type: 'varchar',
                length: 100
            },
            Estado: {
                type: 'int'
            },
            Seleccionar: {
                type: 'int'
            }
        }
    });


    module.exports = CompraEncuesta;