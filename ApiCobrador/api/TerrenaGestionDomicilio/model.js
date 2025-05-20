const { EntitySchema } = require('typeorm');

const TerrenaGestionDomicilio = new EntitySchema({
    name: 'TerrenaGestionDomicilio',
    tableName: 'TerrenaGestionDomicilio',
    target: class TerrenaGestionDomicilio {
        constructor() {
            this.idTerrenaGestionDomicilio = undefined;
            this.idClienteVerificacion = 0;
            this.idTerrenaTipoCliente = 0;
            this.iTiempoVivienda = 0;
            this.idTerrenaTipoVivienda = 0;
            this.idTerrenaEstadoVivienda = 0;
            this.idTerrenaZonaVivienda = 0;
            this.idTerrenaPropiedad = 0;
            this.idTerrenaAcceso = 0;
            this.idTerrenaCobertura = 0;
            this.PuntoReferencia = '';
            this.PersonaEntrevistada = '';
            this.Observaciones = '';
            this.VecinoEntreVisto = '';
            this.DireccionesVisitada = '';
            this.Latitud = 0;
            this.Longitud = 0;
            this.FechaSistema = new Date();
            this.Estacion = '';
            this.Usuario = '';
            this.domicilioImages = '';
            this.CallePrincipal = '';
            this.CalleSecundaria = '';
            this.ValorArrendado = 0;
            this.direccionCoincide = 0;
            this.tipoVerificacion = 0;

        }
    }
    ,
    columns: {
        idTerrenaGestionDomicilio: {
            primary: true,
            type: 'int',
            generated: true
        },
        idClienteVerificacion: {
            type: 'int'
        },
        idTerrenaTipoCliente: {
            type: 'int'
        },
        iTiempoVivienda: {
            type: 'int'
        },
        idTerrenaTipoVivienda: {
            type: 'int'
        },
        idTerrenaEstadoVivienda: {
            type: 'int'
        },
        idTerrenaZonaVivienda: {
            type: 'int'
        },
        idTerrenaPropiedad: {
            type: 'int'
        },
        idTerrenaAcceso: {
            type: 'int'
        },
        idTerrenaCobertura: {
            type: 'int'
        },
        PuntoReferencia: {
            type: 'varchar',
            length: 255
        },
        PersonaEntrevistada: {
            type: 'varchar',
            length: 255
        },
        Observaciones: {
            type: 'varchar',
            length: 255
        },
        VecinoEntreVisto: {
            type: 'varchar',
            length: 255
        },
        DireccionesVisitada: {
            type: 'varchar',
            length: 255
        },
        Latitud: {
            type: 'float'
        },
        Longitud: {
            type: 'float'
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        Estacion: {
            type: 'varchar',
            length: 255
        },
        Usuario: {
            type: 'varchar',
            length: 255
        },
        domicilioImages: {
            type: 'varchar'
        },
        CallePrincipal: {
            type: 'varchar',
            length: 255
        },
        CalleSecundaria: {
            type: 'varchar',
            length: 255
        },
        ValorArrendado: {
            type: 'float'
        },
        direccionCoincide: {
            type: 'int'
        },
        tipoVerificacion: {
            type: 'int'
        }
    }
});

module.exports = TerrenaGestionDomicilio;