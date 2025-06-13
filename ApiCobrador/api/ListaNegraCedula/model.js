/*CREATE TABLE [dbo].[ListaNegraCedula](
	[idListaNegraCedula] [int] IDENTITY(1,1) NOT NULL,
	[Cedula] [varchar](20) NULL,
	[Observacion] [varchar](255) NULL,
	[Activo] [bit] NULL,
	[FechaSistema] [datetime] NULL,
	[Estacion] [varchar](50) NULL,
	[Usuario] [varchar](50) NULL,*/

const { EntitySchema } = require('typeorm');
const ListaNegraCedula = new EntitySchema({
    name: 'ListaNegraCedula',
    tableName: 'ListaNegraCedula',
    target: class ListaNegraCedula {
        constructor() {
            this.idListaNegraCedula = undefined;
            this.Cedula = '';
            this.Observacion = '';
            this.Activo = true;
            this.Estacion = '';
            this.Usuario = '';
        }
    },
    columns: {
        idListaNegraCedula: {
            type: Number,
            primary: true,
            generated: true
        },
        Cedula: {
            type: String,
            length: 20,
            nullable: true
        },
        Observacion: {
            type: String,
            length: 255,
            nullable: true
        },
        Activo: {
            type: Boolean,
            nullable: true
        },
       
        Estacion: {
            type: String,
            length: 50,
            nullable: true
        },
        Usuario: {
            type: String,
            length: 50,
            nullable: true
        }
    }
});
module.exports = ListaNegraCedula;
