const { AppDataSource } = require("../config/database");
const Cob_APPCobrosEfectivoSchema = require('./model'); // Ajusta la ruta según sea necesario
const  IngresoCobrador = require('../IngresoCobrador/model');
exports.save = async (req, res) => {
    const { idCompra, idCobrador, Valor, Imagen, Usuario, Voucher } = req.body;

    try {
        // Validaciones de los campos obligatorios
        console.log('idCompra:', idCompra);
        if (!idCompra) {
            console.log('idCompra no proporcionado');
            return res.status(400).json({ message: "El campo idCompra es obligatorio" });
        }

        console.log('idCobrador:', idCobrador);
        if (!idCobrador) {
            console.log('idCobrador no proporcionado');
            return res.status(400).json({ message: "El campo idCobrador es obligatorio" });
        }

        console.log('Valor:', Valor);
        if (!Valor) {
            console.log('Valor no proporcionado');
            return res.status(400).json({ message: "El campo Valor es obligatorio" });
        }

        console.log('Imagen:', Imagen);
        if (!Imagen) {
            console.log('Imagen no proporcionado');
            return res.status(400).json({ message: "El campo Imagen es obligatorio" });
        }

        console.log('Usuario:', Usuario);
        let UserNuevo = '';
        if (!Usuario) {
            // Traemos solo el campo 'codigo' de la tabla 'IngresoCobrador' usando select
            UserNuevo = await AppDataSource.getRepository(IngresoCobrador)
                .findOne({ 
                    select: ["Codigo"],  // Solo seleccionamos el campo 'codigo'
                    where: { idIngresoCobrador: idCobrador }
                });
        
            // Si el código es encontrado, puedes usarlo de la siguiente manera:
            if (!UserNuevo) {
                return res.status(400).json({ message: "El Cobrador no fue encontrado" });
            }
        }
        

        console.log('Voucher:', Voucher);
        if (!Voucher) {
            console.log('Voucher no proporcionado');
            return res.status(400).json({ message: "El campo Voucher es obligatorio" });
        }

        // Si Imagen es un array, convertirlo a una cadena separada por comas
        let imagenString = Imagen;
        if (Array.isArray(Imagen)) {
            imagenString = Imagen.join(','); // Convertir array a string separado por comas
        }

        // Crear objeto de registro
        const registro = {
            idCompra,
            idCobrador,
            Valor,
            Imagen: imagenString, // Usar la cadena convertida
            Usuario: Usuario ? Usuario : UserNuevo.Codigo, // Usar el código del cobrador si no se proporciona el campo Usuario
            Voucher
        };


        // Obtener la fecha actual
        const FechaSistema = new Date();
        registro.Fecha = FechaSistema;

        // Obtener el repositorio
        const repository = AppDataSource.getRepository(Cob_APPCobrosEfectivoSchema);

        // Obtener el número total de registros existentes y generar el siguiente consecutivo
        const count = await repository.count();
        const consecutivo = count + 1;
        const numeroRegistro = `APP-COBRO${consecutivo.toString().padStart(6, '0')}`;

        // Asignar el número consecutivo al campo correspondiente en el registro
        registro.Numero = numeroRegistro;

        // Guardar el registro en la base de datos
        await repository.save(registro);

        // Responder con éxito
        res.json({ message: "Registro insertado correctamente", Voucher: numeroRegistro });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al insertar el registro" });
    }
};
