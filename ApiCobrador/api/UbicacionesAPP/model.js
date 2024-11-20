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
        }
    }
});

module.exports = UbicacionesAPP;
