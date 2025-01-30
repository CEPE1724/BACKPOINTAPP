
// Dependencias
const { EntitySchema } = require('typeorm');

const NotifiacionCuotaPagos = new EntitySchema({
    name: 'NotifiacionCuotaPagos',
    tableName: 'NotifiacionCuotaPagos',
    target: class NotifiacionCuotaPagos {
        constructor() {
            this.idNotifiacionCuotaPagos = undefined;
            this.idCompra = 0;
            this.idAnticipo = 0;
            this.estado = 0;
            this.bodega = 0;
            this.Celular = '';
            this.Valor = 0;
            this.tipo = 0;
            this.fechaNotificacion = new Date();
            this.errorinfo = '';
            this.cod_error = '';
        }
    },
    columns: {
        idNotifiacionCuotaPagos: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCompra: {
            type: 'int',
            default: 0
        },
        idAnticipo: {
            type: 'int',
            default: 0
        },
        estado: {
            type: 'int',
            default: 0
        },
        bodega: {
            type: 'int',
            default: 0
        },
        Celular: {
            type: 'varchar',
            length: 15,
            default: ''
        },
        Valor: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0
        },
        tipo: {
            type: 'int',
            default: 0
        },
        fechaNotificacion: {
            type: 'datetime',
            default: new Date()
        },
        errorinfo: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        cod_error: {
            type: 'varchar',
            length: 255,
            default: ''
        }
    }
});

module.exports = NotifiacionCuotaPagos;

