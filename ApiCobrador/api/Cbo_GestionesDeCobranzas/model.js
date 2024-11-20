// models/Cbo_GestionesDeCobranzas/model.js
const { EntitySchema } = require('typeorm');

const Cbo_GestionesDeCobranzasSchema = new EntitySchema({
    name: 'Cbo_GestionesDeCobranzas',
    tableName: 'Cbo_GestionesDeCobranzas',
    target: class Cbo_GestionesDeCobranzas {
        constructor() {
            this.idCbo_GestionesDeCobranzas = undefined;    
            this.idCompra = 0;    
            this.idPersonal = 0;    
            this.Fecha = new Date();    
            this.idCbo_EstadoGestion = 0;    
            this.idCbo_ResultadoGestion = 0;    
            this.FechaPago = new Date();    
            this.Valor = 0;        
            this.Usuario = " ";    
            this.Notas = null;    
            this.idCliente = 0;        
            this.Tipo = 0;    
            this.idCbo_EstadosTipocontacto = 0;
        }
    },
    columns: { 
        idCbo_GestionesDeCobranzas: {
            primary: true,
            type: 'int',
            generated: true
        },    
        idCompra: {
            type: 'int'
        },    
        idPersonal: {
            type: 'int'
        },    
        Fecha: {
            type: 'datetime'
        },    
        idCbo_EstadoGestion: {
            type: 'int'
        },    
        idCbo_ResultadoGestion: {
            type: 'int'
        },    
        FechaPago: {
            type: 'datetime'
        },    
        Valor: {
            type: 'decimal'
        },        
        Usuario: {
            type: 'varchar',
            length: 255
        },    
        Notas: {
            type: 'varchar',
            length: 255
        },    
        idCliente: {
            type: 'int'
        },        
        Tipo: {
            type: 'int'
        },    
        idCbo_EstadosTipocontacto: {
            type: 'int'
        }
    }
});

module.exports = Cbo_GestionesDeCobranzasSchema;
