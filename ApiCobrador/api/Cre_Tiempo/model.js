/*
CREATE TABLE [dbo].[Cre_Tiempo](
	[idCre_Tiempo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](60) NULL,
	[Activo] [bit] NULL,*/


const { EntitySchema } = require('typeorm');
const Cre_Tiempo = new EntitySchema({
    name: 'Cre_Tiempo',
    tableName: 'Cre_Tiempo',
    target: class Cre_Tiempo {
        constructor() {
            this.idCre_Tiempo = undefined;
            this.Descripcion = "";
            this.Activo = false;
        }
    },
    columns: {
        idCre_Tiempo: {
            primary: true,
            type: 'int',
            generated: true
        },
        Descripcion: {
            type: 'varchar',
            length: 60
        },
        Activo: {
            type: 'int',
        }
    }
});
module.exports = Cre_Tiempo;