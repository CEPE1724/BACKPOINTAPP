// models/Usuario.js
const { EntitySchema } = require('typeorm');
const Bodega = new EntitySchema({
    name: 'Bodega',
    tableName: 'Bodega',
    target: class Bodega {
        constructor() {
            this.idBodega = undefined;
            this.Nombre = '';
            this.Bodega = 0;
            this.Codigo = '';
            this.Activo = 0;
            this.Factura = 0;
            this.Almacen = 0;
            this.Inventario = 0;
         
        }
    },
    columns: {
        idBodega: {
            primary: true,
            type: 'int',
            generated: true
        },
        Nombre: {
            type: 'varchar'
        },
        Bodega: {
            type: 'int'
        },
        Codigo: {
            type: 'varchar'
        },
        Activo: {
            type: 'int'
        },
        Factura: {
            type: 'int'
        },
        Almacen: {
            type: 'int'
        },
        Inventario: {
            type: 'int'
        }
    }
});

module.exports = Bodega;
