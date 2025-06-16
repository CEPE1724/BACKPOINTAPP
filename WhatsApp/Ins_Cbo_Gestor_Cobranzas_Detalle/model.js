
const { EntitySchema } = require('typeorm');


const Cbo_Gestor_Cobranzas_Detalle = new EntitySchema({
    name: 'Cbo_Gestor_Cobranzas_Detalle',
    tableName: 'Cbo_Gestor_Cobranzas_Detalle',
    target: class Cbo_Gestor_Cobranzas_Detalle {
        constructor() {
            this.idCbo_Gestor_Cobranzas_Detalle = undefined;
            this.idCompra = 0;
            this.Fecha = new Date();
            this.intentosLLamada = 0;            
            this.Contesto = '';
            this.succesEvaluation = '';
            this.urlGrabacion = '';
            this.transcript = '';
            this.tiempoLlamada = '';
            this.compromiso = '';
            this.fechaCompromisoDePago = null;            
            this.resumen = '';
            this.numeroequivocado = '';
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
        Fecha: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        intentosLLamada: {
            type: 'int',
            default: 0
        },
        Contesto: {
            type: 'varchar',
            length: 2
        },
        succesEvaluation: {
            type: 'varchar',
            length: 1000
        },
        urlGrabacion: {
            type: 'varchar',
            length: 1000
        },
        transcript: {
            type: 'varchar',
            length: 1000
        }, 
        tiempoLlamada: {
            type: 'varchar',
            length: 1000
        },  
        compromiso: {
            type: 'varchar',
            length: 2
        },     
        fechaCompromisoDePago: {
            type: 'datetime',
            nullable: true
        },
        resumen: {
            type: 'varchar',
            length: 8000
        },
        numeroequivocado: {
            type: 'varchar',
            length: 2
        },
    }

});
module.exports = Cbo_Gestor_Cobranzas_Detalle;
