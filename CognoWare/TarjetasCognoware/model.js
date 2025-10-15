/*CREATE TABLE [dbo].[tarjetasCognoware_1](
    [idtarjetasCognoware] [int] IDENTITY(1,1) NOT NULL,
    [idtarjetas] [int] NULL,
    [idtransacciones] [int] NULL,
    [institucion] [varchar](255) NULL,
    [emisor] [varchar](255) NULL,
    [antiguedad] [int] NULL,
    [cupo] [decimal](18, 2) NULL,
    [estado] [int] NULL,
    [fechaSistema] [datetime] NULL,
    [usuario] [varchar](50) NULL,
    [estacion] [varchar](50) NULL,*/


const { columns } = require('mssql');
const { EntitySchema } = require('typeorm');
const tarjetasCognoware_1 = new EntitySchema({
    name: 'tarjetasCognoware_1',
    tableName: 'tarjetasCognoware_1',
    target: class tarjetasCognoware_1 {
        constructor() {
            this.idtarjetasCognoware = undefined;
            this.idtarjetas = 0;
            this.idtransacciones = 0;
            this.institucion = '';
            this.emisor = '';
            this.antiguedad = 0;
            this.cupo = 0;
            this.estado = 0;
            this.App = 0;
        }
    },
    columns: {
        idtarjetasCognoware: {
            primary: true,
            type: 'int',
            generated: true
        },
        idtarjetas: {
            type: 'int'
        },
        idtransacciones: {
            type: 'int'
        },
        institucion: {
            type: 'varchar'
        },
        emisor: {
            type: 'varchar'
        },
        antiguedad: {
            type: 'int'
        },
        cupo: {
            type: 'decimal'
        },
        estado: {
            type: 'int'
        },
        App: {
            type: 'int'
        }

    }
});
module.exports = tarjetasCognoware_1;
