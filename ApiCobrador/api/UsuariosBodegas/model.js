// models/Usuario.js
const { EntitySchema } = require('typeorm');

const UsuariosBodegas = new EntitySchema({
    name: 'UsuariosBodegas',
    tableName: 'UsuariosBodegas',
    target: class UsuariosBodegas {
        constructor() {
            this.idUsuarioBodega = undefined;
            this.idUsuario = 0;
            this.Bodega = 0;
         
        }
    },
    columns: {
        idUsuarioBodega: {
            primary: true,
            type: 'int',
            generated: true
        },
        idUsuario: {
            type: 'int'
        },
        Bodega: {
            type: 'int'
        }
    }
});

module.exports = UsuariosBodegas;
