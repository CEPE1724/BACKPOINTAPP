const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const Pagados = require("./model");

exports.InsertarPagados = async (req, res) => {
    try {

        const { Estado, Numero, Cedula, Cliente, Monto , Vendedor } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!Estado || !Numero || !Cedula || !Cliente || !Monto || !Vendedor) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }


        // 1. Validar Estado: debe ser 1 o 2
        if (![1, 2].includes(Number(Estado))) {
            return res.status(400).json({ error: 'El campo "Estado" debe ser 1(Aprobado) o 2(Rechazado).' });
        }



              // 5. Validar que el número no se repita
              const repo = AppDataSource.getRepository(Pagados);
              const existe = await repo.findOne({ where: { Numero } });
              if (existe) {
                  return res.status(400).json({ error: 'Ya existe un registro con este número.' });
              }
      

        // 2. Validar Cedula: debe tener exactamente 10 dígitos y los dos primeros entre 01 y 24
        if (!/^\d{10}$/.test(Cedula)) {
            return res.status(400).json({ error: 'La cédula debe contener exactamente 10 dígitos numéricos.' });
        }
        const provincia = parseInt(Cedula.substring(0, 2), 10);
        if (provincia < 1 || provincia > 24) {
            return res.status(400).json({ error: 'La cédula debe iniciar con un código de provincia entre 01 y 24.' });
        }

        // 3. Validar Cliente: debe tener más de 3 caracteres
        if (!Cliente || Cliente.trim().length <= 3) {
            return res.status(400).json({ error: 'El nombre del cliente debe tener más de 3 caracteres.' });
        }

        // 4. Validar Monto: debe ser mayor a 0 y tener máximo dos decimales
        const montoValido = /^[0-9]+(\.[0-9]{1,2})?$/.test(Monto);
        if (!montoValido || parseFloat(Monto) <= 0) {
            return res.status(400).json({ error: 'El monto debe ser un número mayor a 0 con máximo dos decimales.' });
        }

        // 5 . cedula vendedor validaciones 

        if (!/^\d{10}$/.test(Vendedor)) {
            return res.status(400).json({ error: 'La cédula del vendedor debe contener exactamente 10 dígitos numéricos.' });
        }
        const provinciaa = parseInt(Vendedor.substring(0, 2), 10);
        if (provinciaa < 1 || provinciaa > 24) {
            return res.status(400).json({ error: 'La cédula del vendedor debe iniciar con un código de provincia entre 01 y 24.' });
        }

  
        // Crear una nueva instancia de Pagados
        const registro ={
            Fecha: new Date(),
            Estado,
            Numero,
            Cedula,
            Cliente,
            Monto,
            Vendedor
        };
        // Guardar el registro en la base de datos
        const nuevoRegistro = await AppDataSource.getRepository(Pagados).save(registro);
        return res.status(201).json(nuevoRegistro);
    }

    catch (error) {
        console.error('Error al insertar el registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}