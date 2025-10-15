// models/Usuario.js
const { EntitySchema } = require('typeorm');


const GestionDiaria = new EntitySchema({
    name: 'GestionDiaria',
    tableName: 'GestionDiaria',
    target: class GestionDiaria {
        constructor() {
            this.idGestionDiaria  = undefined;
            this.Cedula = "",
            this.idCobrador = 0,
            this.Users = "",
            this.idCompra = 0,
            this.Compromiso = 0,
            this.Dia = new Date(),
            this.Gestionado = 0,
            this.FechaSistema = new Date(),
            this.Estacion = "",
            this.Usuario = ""
        }
    },
    columns: {
        idGestionDiaria: {
            primary: true,
            type: 'int',
            generated: true
        },
        Cedula: {
            type: 'varchar',
            length: 10
        },
        idCobrador: {
            type: 'int'
        },
        Users: {
            type: 'varchar',
            length: 50
        },
        idCompra: {
            type: 'int'
        },
        Compromiso: {
            type: 'int'
        },
        Dia: {
            type: 'date'
        },
        Gestionado: {
            type: 'int'
        },
        FechaSistema: {
            type: 'datetime'
        },
        Estacion: {
            type: 'varchar',
            length: 50
        },
        Usuario: {
            type: 'varchar',
            length: 50
        }
    }
});

module.exports = GestionDiaria;
