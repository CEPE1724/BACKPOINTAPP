// models/Usuario.js


const { EntitySchema } = require('typeorm');


const ProtecionDatosWeb = new EntitySchema({
    name: 'ProtecionDatosWeb',
    tableName: 'ProtecionDatosWeb',
    target: class ProtecionDatosWeb {
        constructor() {
            this.idProtecionDatosWeb = undefined;
            this.Cedula = "",
            this.Nombre = "",
            this.Apellido = "",
            this.CodigoDactilar = "",
            this.IpWeb = "",
            this.UrlContrato = "",
            this.UrlImage = "",
            this.Fecha = new Date(),
            this.Estacion = "",
            this.Usuario = "",
            this.Celular = ""
        }
    },
    columns: {
        idProtecionDatosWeb: {
            primary: true,
            type: 'int',
            generated: true
        },
        Cedula: {
            type: 'varchar',
            length: 13
        },
        Nombre: {
            type: 'varchar',
            length: 100
        },
        Apellido: {
            type: 'varchar',
            length: 100
        },
        CodigoDactilar: {
            type: 'varchar',
            length: 50
        },
        IpWeb: {
            type: 'varchar',
            length: 50
        },
        UrlContrato: {
            type: 'varchar',
            length: 600
        },
        UrlImage: {
            type: 'varchar',
            length: 600
        },
        Fecha: {
            type: 'datetime'
        },
        Estacion: {
            type: 'varchar',
            length: 50
        },
        Usuario: {
            type: 'varchar',
            length: 50
        },
        Celular: {
            type: 'varchar',
            length: 15
        }
    }
});

module.exports = ProtecionDatosWeb;

          