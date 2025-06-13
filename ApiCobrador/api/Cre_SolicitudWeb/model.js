
const { EntitySchema } = require('typeorm');

const Cre_SolicitudWeb = new EntitySchema({
    name: 'Cre_SolicitudWeb',
    tableName: 'Cre_SolicitudWeb',
    target: class Cre_SolicitudWeb {
        constructor() {
            this.idCre_SolicitudWeb = undefined;
            this.idEstadoVerificacionTerrena = 0;
            this.idEstadoVerificacionDomicilio = 0;
            this.Estado =0;
            this.Resultado = 0;

           
        }
    },
    columns: {
        idCre_SolicitudWeb: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEstadoVerificacionTerrena: {
            type: 'int'
        },
        idEstadoVerificacionDomicilio: {
            type: 'int'
        },
        Estado: {
            type: 'int',
            default: 0
        },
        Resultado: {
            type: 'int',
            default: 0
        }
    }
});

module.exports = Cre_SolicitudWeb;
