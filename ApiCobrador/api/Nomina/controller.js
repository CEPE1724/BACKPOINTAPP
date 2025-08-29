
const { AppDataSource } = require("../config/database");
const Nomina = require('./model'); // Asegúrate de que 'Nomina' esté bien importado
const DispositivosAPP = require('../DispositivosAPP/model'); // Asegúrate de que 'DispositivosAPP' esté bien importado
exports.getProductoSolicitudByIdNomina = async (req, res) => {
    const { idnomina } = req.params;

    try {
       // obtener usuaropapp
        const dispositivoRepository = AppDataSource.getRepository(DispositivosAPP);
        const dispositivo = await dispositivoRepository.findOne({
            where: { idNomina: idnomina },
        });
        if (!dispositivo) {
            return res.status(404).json({
                success: false,
                message: 'Dispositivo not found'
            });
        }
        // obtener Codigo 
        const UsuarioAPP = dispositivo.UsuarioAPP;
        if (!UsuarioAPP) {
            return res.status(404).json({
                success: false,
                message: 'UsuarioAPP not found'
            });
        }


        const nominaRepository = AppDataSource.getRepository(Nomina);
        const nomina = await nominaRepository.findOne({
            where: { Codigo: UsuarioAPP },
        });

        if (!nomina) {
            return res.status(404).json({
                success: false,
                message: 'Nomina not found'
            });
        }

        res.status(200).json({
            success: true,
            data: nomina.idPersonal, // Assuming idPersonal is the field you want to return
        });
    } catch (error) {
        console.error('Error al obtener la solicitud de producto por ID de nómina:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la solicitud de producto por ID de nómina'
        });
    }
}
