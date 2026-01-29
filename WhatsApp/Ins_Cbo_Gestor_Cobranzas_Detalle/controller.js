const { SimpleConsoleLogger } = require('typeorm')
const { AppDataSource } = require('../../ApiCobrador/api/config/database')
const Cbo_Gestor_Cobranzas_Detalle = require('./model') // Ajusta la ruta según sea necesario

exports.save = async (req, res) => {
  const {
    idCompra,
    intentosLLamada,
    Contesto,
    succesEvaluation,
    urlGrabacion,
    transcript,
    tiempoLlamada,
    compromiso,
    fechaCompromisoDePago,
    resumen,
    numeroequivocado
  } = req.body
  console.log('Datos recibidos:', req.body)
  try {
    // Validaciones de los campos obligatorios
    console.log('idCompra:', idCompra)
    if (!idCompra) {
      console.log('idCompra no proporcionado')
      return res
        .status(400)
        .json({ message: 'El campo idCompra es obligatorio' })
    }

    if (!Contesto) {
      return res
        .status(400)
        .json({ message: 'El campo Contesto es obligatorio' })
    }

    if (!resumen) {
      return res
        .status(400)
        .json({ message: 'El campo Resumen es obligatorio' })
    }

    if (!urlGrabacion) {
      return res.status(400).json({ message: 'El campo URL es obligatorio' })
    }

    // Crear objeto de registro
    const registro = {
      idCompra: idCompra,
      intentosLLamada: intentosLLamada, // Valor por defecto
      Contesto: Contesto, // Valor por defecto
      succesEvaluation: succesEvaluation, // Valor por defecto
      urlGrabacion: urlGrabacion, // Valor por defecto
      transcript: transcript, // Valor por defecto
      tiempoLlamada: tiempoLlamada, // Valor por defecto
      compromiso: compromiso, // Valor por defecto
      fechaCompromisoDePago: fechaCompromisoDePago, // Valor por defecto
      resumen: resumen, // Valor por defecto
      numeroequivocado: numeroequivocado // Valor por defecto
    }
    console.log('Registro a insertar:', registro)
    // Obtener el repositorio
    const repository = AppDataSource.getRepository(Cbo_Gestor_Cobranzas_Detalle)

    // Guardar el registro en la base de datos
    await repository.save(registro)

    // Responder con éxito
    res.json({ message: 'Registro insertado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al insertar el registro' })
  }
}
