

const { EntitySchema } = require('typeorm');

const DTIngreso = new EntitySchema({
    name: 'DTIngreso',
    tableName: 'DTIngreso',
    target: class DTIngreso {
        constructor() {
            this.idIngreso = undefined;
            this.Ingreso='';
            this.idFCompra = 0;
            this.Imagen1 = '';
            this.Imagen2 = '';
            this.Imagen3 = '';
            this.GoogleImg1 = '';
            this.GoogleImg2 = '';
            this.GoogleImg3 = '';
            this.iGoogle = 0;
        }
    },
    columns: {
        idIngreso: {
            type: 'int',
            primary: true,
            generated: true
        },
        Ingreso: {
            type: 'varchar',
            length: 255
        },
        idFCompra: {
            type: 'int'
        },
        Imagen1: {
            type: 'varchar',
            length: 255
        },
        Imagen2: {
            type: 'varchar',
            length: 255
        },
        Imagen3: {
            type: 'varchar',
            length: 255
        },
        GoogleImg1: {
            type: 'varchar',
            length: 255
        },
        GoogleImg2: {
            type: 'varchar',
            length: 255
        },
        GoogleImg3: {
            type: 'varchar',
            length: 255
        },
        iGoogle: {
            type: 'int'
        }

    }
});

module.exports = DTIngreso;
