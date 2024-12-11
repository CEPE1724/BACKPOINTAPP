const { EntitySchema } = require('typeorm');

const TerrenaGestionTrabajo = new EntitySchema({
    name: 'TerrenaGestionTrabajo',
    tableName: 'TerrenaGestionTrabajo',
    target: class TerrenaGestionTrabajo {
        constructor() {
            this.idTerrenaGestionTrabajo = undefined;
            this.idClienteVerificacion = 0;
            this.idTerrenaTipoTrabajo = 0;
            this.iTiempoTrabajo = 0;
            this.iTiempoTrabajoYear = 0;
            this.dIngresoTrabajo = 0;
            this.ActividadTrabajo = '';
            this.TelefonoTrabajo = '';
            this.PuntoReferencia = '';
            this.PersonaEntrevistada = '';
            this.DireccionesVisitada = '';
            this.Latitud = 0;
            this.Longitud = 0;
            this.trabajoImages ='';
            this.CallePrincipal = '';
            this.CalleSecundaria = '';

        }
    }
    ,
    columns: {
        idTerrenaGestionTrabajo: {
            primary: true,
            type: 'int',
            generated: true
        },
        idClienteVerificacion: {
            type: 'int'
        },
        idTerrenaTipoTrabajo: {
            type: 'int'
        },
        iTiempoTrabajo: {
            type: 'int'
        },
        iTiempoTrabajoYear: {
            type: 'int'
        },
        dIngresoTrabajo: {
            type: 'int'
        },
        ActividadTrabajo: {
            type: 'varchar'
        },
        TelefonoTrabajo: {
            type: 'varchar'
        },
        PuntoReferencia: {
            type: 'varchar'
        },
        PersonaEntrevistada: {
            type: 'varchar'
        },
        DireccionesVisitada: {
            type: 'varchar'
        },
        Latitud: {
            type: 'float'
        },
        Longitud: {
            type: 'float'
        },
        trabajoImages: {
            type: 'varchar'
        },
        CallePrincipal: {
            type: 'varchar',
            length: 250
        },
        CalleSecundaria: {
            type: 'varchar',
            length: 250
        }
    }
});

module.exports = TerrenaGestionTrabajo;


            