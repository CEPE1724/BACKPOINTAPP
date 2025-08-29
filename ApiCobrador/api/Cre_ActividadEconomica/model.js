/*
CREATE TABLE [dbo].[Cre_ActividadEconomica](
	[idActEconomica] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [varchar](5) NULL,
	[FuenIngrs] [varchar](50) NULL,
	[Nombre] [varchar](200) NULL,
	[CodPichincha] [varchar](1) NULL,
	[idEntidadFinanciera] [int] NULL,
	[idFuenteIngreso] [int] NULL,
	[Codigo_BA] [varchar](5) NULL,
	[Tipo] [int] NULL,
    */


const { EntitySchema } = require('typeorm');

const Cre_ActividadEconomica = new EntitySchema({
    name: 'Cre_ActividadEconomica',
    tableName: 'Cre_ActividadEconomica',
    target: class Cre_ActividadEconomica {
        constructor() {
            this.idActEconomica = undefined;
            this.Codigo = "";
            this.FuenIngrs = "";
            this.Nombre = "";
            this.CodPichincha = "";
            this.idEntidadFinanciera = 0;
            this.idFuenteIngreso = 0;
            this.Codigo_BA = "";
            this.Tipo = 0;
        }
    },

    columns: {
        idActEconomica: {
            primary: true,
            type: 'int',
            generated: true
        },
        Codigo: {
            type: 'varchar',
            length: 5
        },
        FuenIngrs: {
            type: 'varchar',
            length: 50
        },
        Nombre: {
            type: 'varchar',
            length: 200
        },
        CodPichincha: {
            type: 'varchar',
            length: 1
        },
        idEntidadFinanciera: {
            type: 'int'
        },
        idFuenteIngreso: {
            type: 'int'
        },
        Codigo_BA: {
            type: 'varchar',
            length: 5
        },
        Tipo: {
            type: 'int'
        }
    }
});

module.exports = Cre_ActividadEconomica;