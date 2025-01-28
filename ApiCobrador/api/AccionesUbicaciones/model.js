

const { EntitySchema } = require('typeorm');
const AccionesUbicacionesSchema = new EntitySchema({
    name: 'AccionesUbicaciones',
    tableName: 'AccionesUbicaciones',
    target: class AccionesUbicaciones {

        constructor() {
            this.idAccionesUbicaciones = undefined;
            this.idAccion = 0;
            this.tipoAccion = '';
            this.latitude = 0;
            this.longitude = 0;
            this.timestamp = new Date();
            this.enviado = 0;
            this.ICidIngresoCobrador = 0;
            this.Empresa = 0;
            this.idCompra = 0;
            this.idCombo1 = 0;
            this.idCombo2 = 0;
            this.idCombo3 = 0;
            this.TipoPago = 0;
        }
    },
    columns: {
        idAccionesUbicaciones: {
            primary: true,
            type: 'int',
            generated: true
        },
        idAccion: {
            type: 'int'
        },
        tipoAccion: {
            type: 'varchar'
        },
        latitude: {
            type: 'float'
        },
        longitude: {
            type: 'float'
        },
        timestamp: {
            type: 'datetime'
        },
        enviado: {
            type: 'int'
        },
        ICidIngresoCobrador: {
            type: 'int'
        },
        Empresa: {
            type: 'int'
        },
        idCompra: {
            type: 'int'
        },
        idCombo1: {
            type: 'int'
        },
        idCombo2: {
            type: 'int'
        },
        idCombo3: {
            type: 'int'
        },
        TipoPago: {
            type: 'int'
        }
    }
});

module.exports = AccionesUbicacionesSchema;
