/*
CREATE TABLE [dbo].[AsignacionCobradores](
	[idAsignacionCobradores] [int] IDENTITY(1,1) NOT NULL,
	[idZona] [int] NULL,
	[idPersonal] [int] NULL,
	[Desde] [datetime] NULL,
	[Hasta] [datetime] NULL,
	[idCargo] [int] NULL,
	[idSupervisor] [int] NULL,
	[RangoDesde] [int] NULL,
	[RangoHasta] [int] NULL,
PRIMARY KEY CLUSTERED */

const { EntitySchema } = require('typeorm');
const AsignacionCobradores = new EntitySchema({
    name: 'AsignacionCobradores',
    tableName: 'AsignacionCobradores',
    target: class AsignacionCobradores {
        constructor() {
            this.idAsignacionCobradores = undefined;
            this.idZona = 0;
            this.idPersonal = 0;
            this.Desde = new Date();
            this.Hasta = new Date();
            this.idCargo = 0;
            this.idSupervisor = 0;
            this.RangoDesde = 0;
            this.RangoHasta = 0;
        }
    }
    ,
    columns: {
        idAsignacionCobradores: {
            type: Number,
            primary: true,
            generated: true
        },
        idZona: {
            type: Number,
            nullable: true
        },
        idPersonal: {
            type: Number,
            nullable: true
        },
        Desde: {
            type: Date,
            nullable: true
        },
        Hasta: {
            type: Date,
            nullable: true
        },
        idCargo: {
            type: Number,
            nullable: true
        },
        idSupervisor: {
            type: Number,
            nullable: true
        },
        RangoDesde: {
            type: Number,
            nullable: true
        },
        RangoHasta: {
            type: Number,
            nullable: true
        }
    }
});

module.exports = AsignacionCobradores;

    