const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const transaccionesCognoware_1 = require('./model'); // Ajusta la ruta según sea necesario
const tarjetasCognoware_1 = require('../TarjetasCognoware/model'); // Ajusta la ruta según sea necesario
exports.save = async (req, res) => {
  try {
    // Validar si la solicitud es válida
    const { valid, transactions } = req.body;

    // Si la solicitud no es válida
    if (!valid) {
      return res.status(400).json({ message: 'La solicitud no es válida.' });
    }

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({ message: 'No se han proporcionado transacciones.' });
    }

    let totalReceived = 0; // Total de transacciones recibidas
    let totalSaved = 0; // Total de transacciones guardadas
    let totalDuplicated = 0; // Total de transacciones duplicadas
    let duplicatedTransactions = []; // Detalles de las transacciones duplicadas
    let existingTransactionNumbers = []; // Números de requerimiento duplicados

    // Iterar sobre las transacciones y guardar
    for (const transaction of transactions) {
      totalReceived++;

      const {
        equifaxInfo, identificacion, nombre, fechaNacimiento, genero, email, actividadLaboral,
        estabilidadLaboral, telefono, segmento, resultado, valorCuota, numeroRequerimiento,
        respuesta, local, estadoSolicitud, estadoCivil, nivelEducacion, lugarNacimiento,
        fechaIngreso, fechaRespuesta, aprobador, estadoRequerimiento, motivoRechazo, usuario,
        tipoConsulta, nacionalidad, etapa
      } = transaction;

      // Validar la información básica
      if (!identificacion || !nombre || !fechaNacimiento) {
        return res.status(400).json({ message: 'Faltan datos requeridos en la transacción.' });
      }

      // Validar que la información de equifaxInfo sea válida
      if (!equifaxInfo || !Array.isArray(equifaxInfo) || equifaxInfo.length === 0) {
        return res.status(400).json({ message: 'Información de Equifax inválida.' });
      }

      const ValnumeroRequerimiento = (numeroRequerimiento !== null && numeroRequerimiento !== undefined) ? numeroRequerimiento.toString() : '';

      // Consultar si ya existe una transacción con el mismo numeroRequerimiento
      const existingTransaction = await AppDataSource.getRepository(transaccionesCognoware_1)
        .createQueryBuilder("transaccion")
        .where("transaccion.SnumeroRequerimiento = :SnumeroRequerimiento", { SnumeroRequerimiento: ValnumeroRequerimiento })
        .getOne();

      if (existingTransaction) {
        duplicatedTransactions.push({
          numeroRequerimiento: ValnumeroRequerimiento,
          mensaje: 'Ya existe una transacción con el mismo número de requerimiento.',
          identificacion: identificacion,
          nombre: nombre
        });
        existingTransactionNumbers.push(ValnumeroRequerimiento);
        totalDuplicated++;
        continue; // Saltar al siguiente registro sin guardarlo
      }

      // Crear un objeto para guardar la transacción
      const registro = {
        equifax_segmentacion: equifaxInfo[0]?.segmentacion || '',
        equifax_rangoIngresos: equifaxInfo[0]?.rangoIngresos || '',
        equifax_capacidadPago: equifaxInfo[0]?.capacidadPago || '',
        equifax_scoreInclusion: equifaxInfo[0]?.scoreInclusion || '',
        equifax_score: equifaxInfo[0]?.score || '',
        equifax_scoreSobreendeudamiento: equifaxInfo[0]?.scoreSobreendeudamiento || '',
        equifax_totalvencido: equifaxInfo[0]?.totalvencido || '',
        equifax_carteraCastigada: equifaxInfo[0]?.carteraCastigada || '',
        equifax_carteraCastigadaHistorico: equifaxInfo[0]?.carteraCastigadaHistorico || '',
        equifax_carteraVencidaHistorico: equifaxInfo[0]?.carteraVencidaHistorico || '',

        identificacion: identificacion || '',
        nombre: nombre || '',
        fechaNacimiento: convertirFecha(fechaNacimiento),
        genero: genero || '',
        email: email || '',
        actividadLaboral: actividadLaboral || '',
        estabilidadLaboral: estabilidadLaboral || '',
        telefono: telefono || '',
        segmento: segmento || '',
        resultado: resultado || '',
        valorCuota: valorCuota || 0,
        numeroRequerimiento: numeroRequerimiento || 0,
        SnumeroRequerimiento: (numeroRequerimiento !== null && numeroRequerimiento !== undefined) ? numeroRequerimiento.toString() : '',
        respuesta: respuesta || '',
        local: local || '',
        estadoSolicitud: estadoSolicitud || '',
        estadoCivil: estadoCivil || '',
        nivelEducacion: nivelEducacion || '',
        paisNacimiento: lugarNacimiento?.pais || '',
        provinciaNacimiento: lugarNacimiento?.provincia || '',
        cantonNacimiento: lugarNacimiento?.canton || '',
        parroquiaNacimiento: lugarNacimiento?.parroquia || '',
        codigoPostalNacimiento: lugarNacimiento?.codigoPostal || '',
        nacionalidadNacimiento: lugarNacimiento?.nacionalidad || '',
        fechaIngreso: convertirFechaConHora(fechaIngreso),
        fechaRespuesta: convertirFechaConHora(fechaRespuesta),
        fechaTransaccion: convertirFechaConHora(),
        aprobador: aprobador || '',
        etapa: etapa || '',
        estadoRequerimiento: estadoRequerimiento || '',
        motivoRechazo: motivoRechazo || '',
        usuarioTransaccion: usuario || '',
        tipoConsulta: tipoConsulta || '',
        nacionalidad: nacionalidad || '',
        App: 1,
      };

     

      // Guardar la transacción
      const repository = AppDataSource.getRepository(transaccionesCognoware_1);
      await repository.save(registro);

      if (equifaxInfo[0]?.tarjetas && equifaxInfo[0]?.tarjetas.length > 0) {
        // Recorrer todas las tarjetas
        for (const tarjetaData of equifaxInfo[0]?.tarjetas) {
          const tarjeta = {
            idtransacciones: registro.idtransaccionesCognoware,  // Asignar el id de la transacción
            institucion: tarjetaData?.institucion || '',  // Asignar el nombre de la institución
            emisor: tarjetaData?.emisor || '',  // Asignar el emisor
            antiguedad: tarjetaData?.antiguedad || 0,  // Asignar antigüedad de la tarjeta
            cupo: tarjetaData?.cupo || 0,  // Asignar el cupo de la tarjeta
            App: 1,  // Valor adicional
          };
      
          // Guardar la tarjeta en la base de datos
          const tarjetaRepository = AppDataSource.getRepository(tarjetasCognoware_1);
          await tarjetaRepository.save(tarjeta);  // Guardar la tarjeta
          console.log('Registro tarjeta:', tarjeta);  // Imprimir la tarjeta guardada
        }
      }
      
      
      totalSaved++;
    }

    // Respuesta detallada
    return res.status(200).json({
      success: true,
      message: 'Transacciones procesadas correctamente.',
      data: {
        totalReceived: totalReceived,  // Total de transacciones recibidas
        totalSaved: totalSaved,        // Total de transacciones guardadas
        totalDuplicated: totalDuplicated,  // Total de transacciones duplicadas
        duplicatedTransactions: duplicatedTransactions,  // Detalles de las transacciones duplicadas
        existingTransactionNumbers: existingTransactionNumbers,  // Números de requerimiento duplicados
      }
    });

  } catch (error) {
    // Si ocurrió un error, revertimos la transacción
    console.error('Error al guardar las transacciones:', error);
    return res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud.', error: error.message });
  }
};




function convertirFecha(fechaNacimiento) {
  if (!fechaNacimiento) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 porque los meses en JavaScript empiezan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
  // Desestructuramos la fecha por guion
  const [day, month, year] = fechaNacimiento.split("-");

  // Formateamos la fecha a "yyyymmdd"
  const fechaFormateada = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;

  return fechaFormateada;
}


function convertirFechaConHora(fechaIngreso) {
  // Si la fechaIngreso es nula o no está definida, usamos la fecha y hora actual
  if (!fechaIngreso) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 porque los meses en JavaScript empiezan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
  }

  // Desestructuramos la fecha por espacio y luego por guion
  const [fecha, hora] = fechaIngreso.split(" ");
  const [day, month, year] = fecha.split("-");
  const [hours, minutes, seconds] = hora.split(":");

  // Formateamos la fecha y hora a "yyyymmdd HH:MM:SS"
  const fechaFormateada = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')} ${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;

  return fechaFormateada;
}




