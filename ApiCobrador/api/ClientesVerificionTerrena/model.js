// models/Usuario.js
const { EntitySchema } = require('typeorm');

const ClientesVerificionTerrena = new EntitySchema({
    name: 'ClientesVerificionTerrena',
    tableName: 'ClientesVerificionTerrena',
    target: class ClientesVerificionTerrena {
        constructor() {
            this.idClienteVerificacion  = undefined;
            this.Numero = "",
            this.idCre_solicitud = 0,
            this.idCre_DatosGenerales = 0,
            this.Ruc = "",
            this.Nombres = "",
            this.Celular = "",
            this.idVerificador = 0,
            this.iEstado = 0,
            this.Bodega = 0,
            this.Almacen = "",
            this.DireccionDomicilio	= "", 
            this.DireccionTrabajo ="",
            this.FechaEnvio = '1900-01-01',
            this.FechaSistema = new Date(),
            this.Estacion = "",
            this.Usuario = "",
            this.bDomicilio = 0,
            this.bTrabajo = 0,
            this.bDomicilioVerifica = 0,
            this.bTrabajoVerifica = 0,
            this.idTerrenaGestionDomicilio = 0,
            this.idTerrenaGestionTrabajo = 0
        }
    },
    columns: {
        idClienteVerificacion: {
            primary: true,
            type: 'int',
            generated: true
        },
        Numero: {
            type: 'varchar',
            length: 50
        },
        idCre_solicitud: {
            type: 'int'
        },
        idCre_DatosGenerales: {
            type: 'int'
        },
        Ruc: {
            type: 'varchar',
            length: 11
        },
        Nombres: {
            type: 'varchar',
            length: 255
        },
        Celular: {
            type: 'varchar',
            length: 9
        },
        idVerificador: {
            type: 'int'
        },
        iEstado: {
            type: 'int'
        },
        Bodega: {
            type: 'int'
        },
        Almacen: {
            type: 'varchar',
            length: 250
        },
        DireccionDomicilio: {
            type: 'varchar',
            length: 1000
        },
        DireccionTrabajo: {
            type: 'varchar',
            length: 1000
        },
        FechaEnvio: {
            type: 'date'
        },
        FechaSistema: {
            type: 'datetime'
        },
        Estacion: {
            type: 'varchar',
            length: 50
        },
        Usuario: {
            type: 'varchar',
            length: 50
        } ,
        bDomicilio: {
            type: 'int'
        },
        bTrabajo: {
            type: 'int'
        },
        bDomicilioVerifica: {
            type: 'int'
        },
        bTrabajoVerifica: {
            type: 'int'
        },
        idTerrenaGestionDomicilio: {
            type: 'int'
        },
        idTerrenaGestionTrabajo: {
            type: 'int'
        }
    }
});

module.exports = ClientesVerificionTerrena;
