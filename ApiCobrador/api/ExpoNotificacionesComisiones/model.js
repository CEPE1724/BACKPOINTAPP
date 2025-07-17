/*CREATE TABLE ExpoNotificacionesComisiones (
    idExpoNotificacionesComisiones INT IDENTITY(1,1) PRIMARY KEY,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FechaEnvioNotificacion DATETIME ,
    Enviado BIT DEFAULT 0,
    Almacen VARCHAR(50) DEFAULT '',
    PorcentajeComision DECIMAL(18,2) default 0.00,
    TokenExpo VARCHAR(200) DEFAULT '',
    Alert VARCHAR(200) DEFAULT '',
    Titulo VARCHAR(200) DEFAULT '',
    Mensaje VARCHAR(500) DEFAULT ''
);*/

const { EntitySchema } = require('typeorm');


const ExpoNotificacionesComisiones = new EntitySchema({
    name: 'ExpoNotificacionesComisiones',
    tableName: 'ExpoNotificacionesComisiones',
    target: class ExpoNotificacionesComisiones {
        constructor() {
            this.idExpoNotificacionesComisiones = undefined;
            this.FechaCreacion = new Date();
            this.FechaEnvioNotificacion = null;
            this.Enviado = false;
            this.Almacen = "";
            this.PorcentajeComision = 0.00;
            this.TokenExpo = "";
            this.Alert = "";
            this.Titulo = "";
            this.Mensaje = "";
            this.empresa ="";
        }
    },
    columns: {
        idExpoNotificacionesComisiones: {
            primary: true,
            type: 'int',
            generated: true
        },
        FechaCreacion: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        FechaEnvioNotificacion: {
            type: 'datetime',
            nullable: true
        },
        Enviado: {
            type: 'bit',
            default: false
        },
        Almacen: {
            type: 'varchar',
            length: 50,
            default: ''
        },
        PorcentajeComision: {
            type: 'decimal',
            precision: 18,
            scale: 2,
            default: 0.00
        },
        TokenExpo: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        Alert: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        Titulo: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        Mensaje: {
            type: 'varchar',
            length: 500,
            default: ''
        },
        empresa: {
            type: 'varchar',
            length: 50,
            default: ''
        }
    }
});

module.exports = ExpoNotificacionesComisiones;