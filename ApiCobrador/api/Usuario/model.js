// models/Usuario.js
const { EntitySchema } = require('typeorm');

const UsuarioSchema = new EntitySchema({
    name: 'Usuario',
    tableName: 'Usuario',
    target: class Usuario {
        constructor() {
            this.idUsuario = undefined;
            this.Nombre = '';
            this.Clave = '';
            this.idGrupo = 0;
            this.Activo = 0;
        }
    },
    columns: {
        idUsuario: {
            primary: true,
            type: 'int',
            generated: true
        },
        Nombre: {
            type: 'varchar',
            length: 255
        },
        Clave: {
            type: 'varchar',
            length: 255
        },
        idGrupo: {
            type: 'int'
        },
        Activo: {
            type: 'int'
        }
    }
});

module.exports = UsuarioSchema;
