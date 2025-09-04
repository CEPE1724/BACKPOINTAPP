
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
            this.PDFTerrena = '';

           
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
        },
        Foto: {
            type: 'varchar',
            length: 800,
            nullable: true
        },
        PDFTerrena: {
            type: 'varchar',
            length: 800,
            nullable: true
         },
        Cedula: {
            type: 'varchar',
            length: 20,
            nullable: true
        },
         Fecha: {
             type: 'datetime',
             nullable: true
        }
    }
});

module.exports = Cre_SolicitudWeb;
