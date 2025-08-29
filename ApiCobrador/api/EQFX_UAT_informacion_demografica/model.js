/*CREATE TABLE EQFX_UAT_informacion_demografica (
    idEQFX_UAT_informacion_demografica INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    fecha_nacimiento VARCHAR(200) DEFAULT '' ,
    educacion VARCHAR(100) DEFAULT '' ,
    provincia VARCHAR(100) DEFAULT '' ,
    canton VARCHAR(100) DEFAULT '' ,
    direcciones VARCHAR(600) DEFAULT '' ,
    coordenada_x VARCHAR(100) DEFAULT '' ,
    coordenada_y VARCHAR(100) DEFAULT '' ,
    numero_telefonico_convencional VARCHAR(50) DEFAULT '' ,
    numero_telefonico_celular VARCHAR(50) DEFAULT '' ,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_informacion_demografica = new EntitySchema({
    name: 'EQFX_UAT_informacion_demografica',
    tableName: 'EQFX_UAT_informacion_demografica',
    target: class EQFX_UAT_informacion_demografica {
        constructor() {
            this.idEQFX_UAT_informacion_demografica = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.fecha_nacimiento = '';
            this.educacion = '';
            this.provincia = '';
            this.canton = '';
            this.direcciones = '';
            this.coordenada_x = '';
            this.coordenada_y = '';
            this.numero_telefonico_convencional = '';
            this.numero_telefonico_celular = '';
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_informacion_demografica: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        fecha_nacimiento: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        educacion: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        provincia: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        canton: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        direcciones: {
            type: 'varchar',
            length: 600,
            default: ''
        },
        coordenada_x: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        coordenada_y: {
            type: 'varchar',
            length: 100,
            default: ''
        },
        numero_telefonico_convencional: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        numero_telefonico_celular: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_informacion_demografica;