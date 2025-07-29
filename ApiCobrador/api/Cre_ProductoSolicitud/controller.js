/*
CREATE TABLE [dbo].[Cre_ProductoSolicitud](
	[idCre_ProductoSolicitud] [int] IDENTITY(1,1) NOT NULL,
	[Producto] [varchar](100) NULL,
	[Estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
*/

const { AppDataSource } = require("../config/database");
const Cre_ProductoSolicitud = require('./model'); // Asegúrate de que 'Cre_ProductoSolicitud' esté bien importado

exports.Cre_ProductoSolicitud = async (req, res) => {
    try {
        const productoSolicitudRepository = AppDataSource.getRepository(Cre_ProductoSolicitud);
        const productos = await productoSolicitudRepository.find();
        
        res.status(200).json({
            success: true,
            data: productos
        });
    } catch (error) {
        console.error('Error al obtener los productos de solicitud:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos de solicitud'
        });
    }
}
