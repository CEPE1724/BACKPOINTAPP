/*
CREATE TABLE [dbo].[Cre_ProductoSolicitud](
	[idCre_ProductoSolicitud] [int] IDENTITY(1,1) NOT NULL,
	[Producto] [varchar](100) NULL,
	[Estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
*/


const { EntitySchema } = require('typeorm');

const Cre_ProductoSolicitud = new EntitySchema({
    name: 'Cre_ProductoSolicitud',
    tableName: 'Cre_ProductoSolicitud',
    target: class Cre_ProductoSolicitud {
        constructor() {
            this.idCre_ProductoSolicitud = undefined;
            this.Producto = "";
            this.Estado = false;
        }
    },
    columns: {
        idCre_ProductoSolicitud: {
            primary: true,
            type: 'int',
            generated: true
        },
        Producto: {
            type: 'varchar',
            length: 100
        },
        Estado: {
            type: 'int'
        }
    }
    
    });

    module.exports = Cre_ProductoSolicitud;