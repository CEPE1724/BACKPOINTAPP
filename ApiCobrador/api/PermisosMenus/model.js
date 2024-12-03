// models/Usuario.js
const { EntitySchema } = require('typeorm');

const PermisosMenus = new EntitySchema({
    name: 'PermisosMenus',
    tableName: 'PermisosMenus',
    target: class PermisosMenus {
        constructor() {
            this.idPermisoMenu	= undefined;
            this.idRol	= 0;
            this.idMenu	= 0;
            this.puedeAcceder= 0;
         
        }
    },
    columns: {
        idPermisoMenu: {
            primary: true,
            type: 'int',
            generated: true
        },
        idRol: {
            type: 'int'
        },
        idMenu: {
            type: 'int'
        },
        puedeAcceder: {
            type: 'int'
        }
    }
});

module.exports = PermisosMenus;
