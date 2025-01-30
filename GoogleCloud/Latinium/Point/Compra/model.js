
// Dependencias
const { EntitySchema } = require('typeorm');

const Compra = new EntitySchema({
    name: 'Compra',
    tableName: 'Compra',
    target: class Compra {
        constructor() {
            this.idCompra = undefined;
            this.iEstadoGoogle =0;
            this.UrlCompartido = '';
            this.UrlNube = ''; 
        }
    },
    columns: {
        idCompra: {
            primary: true,
            type: 'int',
            generated: true
        },
        iEstadoGoogle: {
            type: 'int'
        },
        UrlCompartido: {
            type: 'varchar',
            length: 'Max'

        },
        UrlNube: {
            type: 'varchar',
            length: 'Max'
        }
    }
});

module.exports = Compra;

