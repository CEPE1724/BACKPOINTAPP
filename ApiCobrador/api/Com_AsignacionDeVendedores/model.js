// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Com_AsignacionDeVendedoresSchema = new EntitySchema({
    name: 'Com_AsignacionDeVendedores',
    tableName: 'Com_AsignacionDeVendedores',
    target: class Com_AsignacionDeVendedores {
        constructor() {
            this.idCom_AsignacionDeVendedores = undefined;
            this.Bodega = 0;
            this.idPersonal = 0;
            this.Desde = new Date();
            this.Hasta = new Date();
            this.idCom_Estado = 0;
        }
    },
    columns: {
        idCom_AsignacionDeVendedores: {
            primary: true,
            type: 'int',
            generated: true
        },
        Bodega: {
            type: 'int'
        },
        idPersonal: {
            type: 'int'
        },
        Desde: {
            type: 'datetime'
        },
        Hasta: {
            type: 'datetime'
        },
        idCom_Estado: {
            type: 'int'
        }
    }
});

module.exports = Com_AsignacionDeVendedoresSchema;
