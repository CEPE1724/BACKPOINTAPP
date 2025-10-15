/*
CREATE TABLE [dbo].[TiempoSolicitudesWeb](
	[idTiempoSolicitudesWeb] [int] IDENTITY(1,1) NOT NULL,
	[idEstadoVerificacionDocumental] [int] NULL,
	[idCre_SolicitudWeb] [int] NULL,
	[Tipo] [int] NULL,
	[Usuario] [varchar](50) NULL,
	[FechaSistema] [datetime] NULL,
	[Telefono] [varchar](500) NULL,*/

const { EntitySchema } = require('typeorm');

const TiempoSolicitudesWeb = new EntitySchema({
    name: 'TiempoSolicitudesWeb',
    tableName: 'TiempoSolicitudesWeb',
    target: class TiempoSolicitudesWeb {
        constructor() {
        this.idTiempoSolicitudesWeb = undefined;
        this.idEstadoVerificacionDocumental = 0;
        this.idCre_SolicitudWeb = 0;
        this.Tipo = 0;
        this.Usuario = '';
        this.FechaSistema = new Date();
        this.Telefono = '';
        }
    },
    columns: {
        idTiempoSolicitudesWeb: {
        type: Number,
        primary: true,
        generated: true
        },
        idEstadoVerificacionDocumental: {
        type: Number,
        nullable: true
        },
        idCre_SolicitudWeb: {
        type: Number,
        nullable: true
        },
        Tipo: {
        type: Number,
        nullable: true
        },
        Usuario: {
        type: String,
        length: 50,
        nullable: true
        },
        FechaSistema: {
        type: Date,
        nullable: true
        },
        Telefono: {
        type: String,
        length: 500,
        nullable: true
        }
    }
    });
module.exports = TiempoSolicitudesWeb;
