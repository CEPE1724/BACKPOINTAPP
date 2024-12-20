// models/Usuario.js
const { EntitySchema } = require('typeorm');

const Cbo_GestorDeCobranzasSchema = new EntitySchema({
    name: 'Cbo_GestorDeCobranzas',
    tableName: 'Cbo_GestorDeCobranzas',
    target: class Cbo_GestorDeCobranzas {
        constructor() {

            this.idCbo_GestorDeCobranzas  = undefined;
            this.idcobrador = 0,  
            this.notcobrador = 0, 
            this.Valor_Cobrar_Proyectado = 0, 
            this.Valor_Cobrado = 0,
            this.Numero_Documento = " "	,
            this.Cedula = " "	,	
            this.Cliente = " "	,
            this.idCompra = 0,
            this.idCliente = 0,
            this.Dias_Mora_Proyectado = 0,
            this.Banco = " ",
            this.Direccion = " ",
            this.Barrio = " "
        }
    },
    columns: {
        idCbo_GestorDeCobranzas: {
            primary: true,
            type: 'int',
            generated: true
        },
        idcobrador: {
            type: 'int'
        },
        notcobrador: {
            type: 'int'
        },
        Valor_Cobrar_Proyectado: {
            type: 'int'
        },
        Valor_Cobrado: {
            type: 'int'
        },
        Numero_Documento: {
            type: 'varchar',
            length: 255
        },
        Cedula: {
            type: 'varchar',
            length: 255
        },
        Cliente: {
            type: 'varchar',
            length: 255
        },
        idCompra: {
            type: 'int'
        },
        idCliente: {
            type: 'int'
        },
        Dias_Mora_Proyectado:  {
            type: 'int'
        } ,
        Banco: {
            type: 'varchar',
            length: 255
        },
        Direccion: {
            type: 'varchar',
            length: 300
        },
        Barrio: {
            type: 'varchar',
            length: 255
        }
    }
});

module.exports = Cbo_GestorDeCobranzasSchema;
