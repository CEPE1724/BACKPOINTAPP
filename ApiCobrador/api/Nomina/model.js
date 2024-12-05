// models/Usuario.js
const { EntitySchema } = require('typeorm');

const NominaSchema = new EntitySchema({
    name: 'Nomina',
    tableName: 'Nomina',
    target: class Nomina {
        constructor() {
            this.idNomina = undefined;
            this.NIdentificacion = '';
            this.ApellidoPaterno = '';
            this.ApellidoMaterno = '';
            this.PrimerNombre = '';
            this.SegundoNombre = '';
            this.Codigo = '';
            this.idPersonal = 0;
        }
    },
    columns: {
        idNomina: {
            primary: true,
            type: 'int',
            generated: true
        },
        NIdentificacion: {
            type: 'varchar',
            length: 20
        },
        ApellidoPaterno: {
            type: 'varchar',
            length: 80
        },
        ApellidoMaterno: {
            type: 'varchar',
            length: 80
        },
        PrimerNombre: {
            type: 'varchar',
            length: 80
        },
        SegundoNombre: {
            type: 'varchar',
            length: 80
        },
        Codigo: {
            type: 'varchar',
            length: 80
        },
        idPersonal: {
            type: 'int'
        }
    }
});

module.exports = NominaSchema;
