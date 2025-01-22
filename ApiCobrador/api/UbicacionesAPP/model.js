// models/UbicacionesAPP.js
const { EntitySchema } = require('typeorm');

const UbicacionesAPP = new EntitySchema({
    name: 'UbicacionesAPP',
    tableName: 'UbicacionesAPP',
    target: class UbicacionesAPP {
        constructor() {
            this.idUbicacionesAPP = undefined;
            this.idUser = 0;
            this.latitude = 0.0; // Cambié a float
            this.longitude = 0.0; // Cambié a float
            this.timestamp = new Date(); // Cambié a Date para reflejar datetime
            this.ICidIngresoCobrador = 0;
            this.ICCodigo = '';
            this.Nombre = '';
            this.iTipoPersonal = 0;
            this.idUsuario = 0;
            this.Empresa = 0;
            this.timestamp = new Date(); // Cambié a Date para reflejar datetime
        }
    },
    columns: {
        idUbicacionesAPP: {
            primary: true,
            type: 'int',
            generated: true
        },
        idUser: {
            type: 'int',
            default: 0 // Valor por defecto
        },
        latitude: {
            type: 'float' // Cambié a float
        },
        longitude: {
            type: 'float' // Cambié a float
        },
        timestamp: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP' // Establecer valor por defecto
        },
        ICidIngresoCobrador: {
            type: 'int',
            default: 0 // Valor por defecto
        },
        ICCodigo: {
            type: 'varchar',
            length: 50
        },
        Nombre: {
            type: 'varchar',
            length: 50
        },
        iTipoPersonal: {
            type: 'int',
            default: 0 // Valor por defecto
        },
        idUsuario: {
            type: 'int',
            default: 0 // Valor por defecto
        },
        Empresa: {
            type: 'int',
            default: 0 // Valor por defecto
        },
        timestamp: {
            type: 'datetime'
        }
    }
});

module.exports = UbicacionesAPP;
