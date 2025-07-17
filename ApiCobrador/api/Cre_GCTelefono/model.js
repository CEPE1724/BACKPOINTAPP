// models/Usuario.js


const { EntitySchema } = require('typeorm');

const Cre_GCTelefono = new EntitySchema({
    name: 'Cre_GCTelefono',
    tableName: 'Cre_GCTelefono',
    target: class Cre_GCTelefono {
        constructor() {
            this.idCre_GCTelefono = undefined;
            this.idCliente = 0;
            this.Telefono = " ";
            this.Descripcion = " ";
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idCre_GCTelefono: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCliente: {
            type: 'int'
        },
        Telefono: {
            type: 'varchar',
            length: 20
        },
        Descripcion: {
            type: 'varchar',
            length: 100
        },
        FechaSistema: {
            type: 'datetime'
        }

    }
});

module.exports = Cre_GCTelefono;
