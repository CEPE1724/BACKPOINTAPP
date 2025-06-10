/*Create table Cbo_Gestor_Cobranzas_Detalle (idCbo_Gestor_Cobranzas_Detalle Int Primary Key Identity(1, 1), idCompra int, Estado int, Fecha Datetime default getdate(), Notas Varchar(8000), URL Varchar(1000)) */

const { EntitySchema } = require('typeorm');

const Cbo_Gestor_Cobranzas_Detalle = new EntitySchema({
    name: 'Cbo_Gestor_Cobranzas_Detalle',
    tableName: 'Cbo_Gestor_Cobranzas_Detalle',
    target: class Cbo_Gestor_Cobranzas_Detalle {
        constructor() {
            this.idCbo_Gestor_Cobranzas_Detalle = undefined;
            this.idCompra = 0;
            this.Estado = 0;
            this.Fecha = new Date();
            this.Notas = '';
            this.URL = '';
        }
    },
    columns: {
        idCbo_Gestor_Cobranzas_Detalle: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCompra: {
            type: 'int'
        },
        Estado: {
            type: 'int'
        },
        Fecha: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        Notas: {
            type: 'varchar',
            length: 8000
        },
        URL: {
            type: 'varchar',
            length: 1000
        }
    }

});
module.exports = Cbo_Gestor_Cobranzas_Detalle;
