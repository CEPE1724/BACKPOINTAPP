/* CREATE TABLE EQFX_UAT_informacion_sri (
    idEQFX_UAT_informacion_sri INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    nombre VARCHAR(255) DEFAULT '' ,
    actividad VARCHAR(255) DEFAULT '' ,
    ruc VARCHAR(20) DEFAULT '' ,
    direccion VARCHAR(255) DEFAULT '' ,
    estado_contribuyente VARCHAR(50) DEFAULT '' ,
    clase_contribuyente VARCHAR(50) DEFAULT '' ,
    codigo_ciiu VARCHAR(50) DEFAULT '' ,
    fecha_inicio_actividades DATE NULL,
    fecha_suspension_definitiva DATE NULL,
    numero_establecimiento INT DEFAULT 0,
    obligado VARCHAR(50) DEFAULT '' ,
    nombre_fantasia_comercial VARCHAR(255) DEFAULT '',
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');

const EQFX_UAT_informacion_sri = new EntitySchema({
    name: 'EQFX_UAT_informacion_sri',
    tableName: 'EQFX_UAT_informacion_sri',
    target: class EQFX_UAT_informacion_sri {
        constructor() {
            this.idEQFX_UAT_informacion_sri = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.nombre = "";
            this.actividad = "";
            this.ruc = "";
            this.direccion = "";
            this.estado_contribuyente = "";
            this.clase_contribuyente = "";
            this.codigo_ciiu = "";
            this.fecha_inicio_actividades = new Date();
            this.fecha_suspension_definitiva = new Date();
            this.numero_establecimiento = 0;
            this.obligado = "";
            this.nombre_fantasia_comercial = "";
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_informacion_sri: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        nombre: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        actividad: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        ruc: {
            type: 'varchar',
            length: 20,
            default: ''
        },
        direccion: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        estado_contribuyente: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        clase_contribuyente: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        codigo_ciiu: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        fecha_inicio_actividades: {
            type: 'date',
            nullable: true
        },
        fecha_suspension_definitiva: {
            type: 'date',
            nullable: true
        },
        numero_establecimiento: {
            type: 'int',
            default: 0
        },
        obligado: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        nombre_fantasia_comercial: {
            type: 'varchar',
            length: 255,
            default: ''
        },
        FechaSistema:{
            type:'datetime',
            default : () => 'CURRENT_TIMESTAMP'
        }
    }
});
module.exports = EQFX_UAT_informacion_sri;
