

// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Cob_APPCobrosEfectivoSchema = new EntitySchema({
    name: 'Cob_APPCobrosEfectivo',
    tableName: 'Cob_APPCobrosEfectivo',
    target: class Cob_APPCobrosEfectivo {
        constructor() {

            this.idCob_APPCobrosEfectivo  = undefined;
            this.idCompra = 0,
            this.idCobrador = 0,
            this.Fecha = "",
            this.Valor = 0,
            this.Estado = 1,
            this.Imagen = "",
            this.idAnticipo = 0,
            this.FechaSistema = "",
            this.Usuario = "",
            this.Estacion = "",
            this.Bodega = 0
        }
    },
    columns: {
        idCob_APPCobrosEfectivo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCompra: {
            type: 'int'
        },
        idCobrador: {
            type: 'int'
        },
        Fecha: {
            type: 'date'
        },
        Valor: {
            type: 'decimal',
            length: 18,
            precision: 2
        },
        Estado: {
            type: 'int'
        },
        Imagen: {
            type: 'varchar',
            length: 'MAX'
        },
        idAnticipo: {
            type: 'int'
        },
        FechaSistema: {
            type: 'datetime'
        },
        Usuario: {
            type: 'varchar',
            length: 60
        },
        Estacion: {
            type: 'varchar',
            length: 60
        },
        Bodega: {
            type: 'int'
        }
        
    }
});

module.exports = Cob_APPCobrosEfectivoSchema;
