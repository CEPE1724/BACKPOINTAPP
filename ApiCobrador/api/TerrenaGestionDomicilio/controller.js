const { AppDataSource } = require("../config/database");
const TerrenaGestionDomicilio = require("./model");
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const Cre_SolicitudWeb = require("../Cre_SolicitudWeb/model");
const DocTerrena = require("../DocTerrena/controller");
const ListaNegraCedula = require("../ListaNegraCedula/model");
const { getPdfDomicilio } = require('./services');
const DispositivosAPP = require("../DispositivosAPP/model");
exports.save = async (req, res) => {
  const {
    idTerrenaGestionDomicilio,
    idClienteVerificacion,
    idTerrenaTipoCliente,
    iTiempoVivienda,
    idTerrenaTipoVivienda,
    idTerrenaEstadoVivienda,
    idTerrenaZonaVivienda,
    idTerrenaPropiedad,
    idTerrenaAcceso,
    idTerrenaCobertura,
    PuntoReferencia,
    PersonaEntrevistada,
    Observaciones,
    VecinoEntreVisto,
    DireccionesVisitada,
    Latitud,
    Longitud,
    domicilioImages,
    CallePrincipal,
    CalleSecundaria,
    ValorArrendado,
    direccionCoincide,
    tipoVerificacion,
  } = req.body;
  const requiredFields = [
    { name: "idClienteVerificacion", value: idClienteVerificacion },
    { name: "idTerrenaTipoCliente", value: idTerrenaTipoCliente },
    { name: "direccionCoincide", value: direccionCoincide },
    { name: "iTiempoVivienda", value: iTiempoVivienda },
    { name: "idTerrenaTipoVivienda", value: idTerrenaTipoVivienda },
    { name: "idTerrenaEstadoVivienda", value: idTerrenaEstadoVivienda },
    { name: "idTerrenaZonaVivienda", value: idTerrenaZonaVivienda },
    { name: "idTerrenaPropiedad", value: idTerrenaPropiedad },
    { name: "idTerrenaAcceso", value: idTerrenaAcceso },
    { name: "idTerrenaCobertura", value: idTerrenaCobertura },
    { name: "PuntoReferencia", value: PuntoReferencia },
    { name: "PersonaEntrevistada", value: PersonaEntrevistada },
    { name: "Observaciones", value: Observaciones },
    { name: "VecinoEntreVisto", value: VecinoEntreVisto },
    { name: "DireccionesVisitada", value: DireccionesVisitada },
    { name: "Latitud", value: Latitud },
    { name: "Longitud", value: Longitud },
    { name: "domicilioImages", value: domicilioImages },
    { name: "CallePrincipal", value: CallePrincipal },
    { name: "CalleSecundaria", value: CalleSecundaria },
    { name: "tipoVerificacion", value: tipoVerificacion },
  ];

  for (const field of requiredFields) {
    if (!field.value) {
      return res.status(400).json({ message: `${field.name} es requerido` });
    }
  }
  try {
    const domicilioImagesString = JSON.stringify(domicilioImages);
    const ubicacion = AppDataSource.getRepository(
      TerrenaGestionDomicilio
    ).create({
      idClienteVerificacion,
      idTerrenaTipoCliente,
      iTiempoVivienda,
      idTerrenaTipoVivienda,
      idTerrenaEstadoVivienda,
      idTerrenaZonaVivienda,
      idTerrenaPropiedad,
      idTerrenaAcceso,
      idTerrenaCobertura,
      PuntoReferencia,
      PersonaEntrevistada,
      Observaciones,
      VecinoEntreVisto,
      DireccionesVisitada,
      Latitud,
      Longitud,
      domicilioImages: domicilioImagesString,
      CallePrincipal,
      CalleSecundaria,
      ValorArrendado,
      direccionCoincide,
      tipoVerificacion,
    });
    const savedLocation = await AppDataSource.getRepository(
      TerrenaGestionDomicilio
    ).save(ubicacion);
    let bTrabajo = false;
    let bDomicilio = true;
    let idTerrenaGestionDomicilioV = 0;
    let idTerrenaGestionTrabajoV = 0;

    /* { value: 2, label: "Aprobado", icon: "check-circle" },
    { value: 1, label: "Dirección incorrecta", icon: "map-marker" }, estado 4, resulato 0
    { value: 3, label: "Malas referencias", icon: "thumbs-down" },estado 4, resulato 0 list anegra
    { value: 4, label: "No vive ahí", icon: "question-circle" },estado 4, resulato 0
    { value: 5, label: "Datos falsos", icon: "exclamation-circle" }, estado 4, resulato 0 list anegra
    { value: 6, label: "Zona Vetada", icon: "ban" },estado 4, resulato 0
    { value: 7, label: "No sustenta ingresos", icon: "money" }, estado 4, resulato 0 list anegra*/
    let EstadoVerificacionDomicilio = tipoVerificacion === 2 ? 2 : 3; // Si es aprobado, estado 1, si no, estado 0

    let clientesRepo = AppDataSource.getRepository(ClientesVerificionTerrena);
    await clientesRepo.update(
      { idClienteVerificacion },
      { idTerrenaGestionDomicilio: savedLocation.idTerrenaGestionDomicilio }
    );

    const cliente = await clientesRepo.findOne({
      where: { idClienteVerificacion },
    });
    if (cliente) {
      bTrabajo = cliente.bTrabajo;
      bDomicilio = cliente.bDomicilio;
      idTerrenaGestionDomicilioV = cliente.idTerrenaGestionDomicilio;
      idTerrenaGestionTrabajoV = cliente.idTerrenaGestionTrabajo;
    }


    if (bTrabajo && idTerrenaGestionTrabajoV > 0) {
      try {
        /*const result = await getPdfDomicilio(idClienteVerificacion);
        
        // Verifica si la respuesta contiene un error
        if (result.error) {
          console.log("Error: ", result.error);
          return; // O maneja el error de la manera que consideres
        }*/

        // Si no hubo error, obtiene la URL del documento generado
        // const urldoc = result.url;

        // Realiza la actualización del cliente
        await clientesRepo.update(
          { idClienteVerificacion },          // Condición para identificar el cliente
          {
            iEstado: 1, UrlGoogle: "",
            FechaEnvio: new Date().toISOString().replace('T', ' ').substr(0, 19),
          }   // Los campos a actualizar
        );


      } catch (error) {
        console.error("Error en el proceso:", error);
        // Aquí puedes manejar errores adicionales si es necesario
      }
    }

    if (!bTrabajo) {
      try {
        /*const result = await getPdfDomicilio(idClienteVerificacion);
        
        // Verifica si la respuesta contiene un error
        if (result.error) {
          console.log("Error: ", result.error);
          return; // O maneja el error de la manera que consideres
        }*/

        // Si no hubo error, obtiene la URL del documento generado
        //const urldoc = result.url;
        // Realiza la actualización del cliente
        await clientesRepo.update(
          { idClienteVerificacion },          // Condición para identificar el cliente
          {
            iEstado: 1, UrlGoogle: "",
            FechaEnvio: new Date().toISOString().replace('T', ' ').substr(0, 19),
          }   // Los campos a actualizar
        );

      } catch (error) {
        console.error("Error en el proceso:", error);
        // Aquí puedes manejar errores adicionales si es necesario
      }
    }
    // obtener idcre_solicitud de clientes verificacion terrena
    const clienteVerificacion = await clientesRepo.findOne({
      where: { idClienteVerificacion },
    });
    // actualizar en cre_solicitud_web el campo idEstadoVerificacionDomicilio a  2
    if (clienteVerificacion) {
      const { idCre_solicitud } = clienteVerificacion;
      console.log("idCre_solicitud:", idCre_solicitud);
      console.log("EstadoVerificacionDomicilio:", tipoVerificacion);
      const creSolicitudRepo = AppDataSource.getRepository(Cre_SolicitudWeb);
      await creSolicitudRepo.update(
        { idCre_SolicitudWeb: idCre_solicitud },
        {
          idEstadoVerificacionDomicilio: EstadoVerificacionDomicilio,
          // Estado: tipoVerificacion === 2 ? creSolicitudRepo.Estado : 7,
          //Resultado: tipoVerificacion === 2 ? creSolicitudRepo.Resultado : 0
        },


      );
      /*  const dispositivoRepo = AppDataSource.getRepository(DispositivosAPP);
        const codigoVerificador = await dispositivoRepo.findOne({
          where: { idNomina: clienteVerificacion.idVerificador, Empresa: 33 },
          select: ['UsuarioAPP'],
        });*/
      /*
            if (tipoVerificacion === 3 || tipoVerificacion === 5 || tipoVerificacion === 7) {
              const listaNegraResult = await ListaNegraCedulaLis(
                cliente.Ruc,
                'Enviado desde la APP de TerrenaGestionDomicilio',
                true,
                codigoVerificador.UsuarioAPP || 'Desconocido'
              );
              if (!listaNegraResult.success) {
                console.error("Error al guardar en la lista negra:", listaNegraResult.message);
              }
            }*/
    }
    res.status(201).json({
      message: "Datos guardados Correctamente",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error al guardar la ubicación:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};



exports.getAll = async (req, res) => {
  const { idTerrenaGestionDomicilio } = req.params;
  if (!idTerrenaGestionDomicilio) {
    return res
      .status(400)
      .json({ message: "idTerrenaGestionDomicilio es requerido" });
  }

  try {
    const ubicaciones = await AppDataSource.getRepository(TerrenaGestionDomicilio).find({
      where: { idTerrenaGestionDomicilio: parseInt(idTerrenaGestionDomicilio) }, // Asegúrate de que 'id' sea el nombre correcto del campo
    });

    res.json({ ubicaciones });
  } catch (error) {
    console.error("Error al obtener las ubicaciones:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

async function ListaNegraCedulaLis(Cedula, Observacion, Activo = true, Usuario = 'Desconocido') {
  const listaNegraRepo = AppDataSource.getRepository(ListaNegraCedula);

  try {
    if (!Cedula) {
      return { success: false, message: "Cédula es requerida." };
    }

    const nuevaEntrada = listaNegraRepo.create({
      Cedula,
      Observacion: Observacion || 'Sin observación',
      Activo,
      Usuario,
    });

    await listaNegraRepo.save(nuevaEntrada);

    return { success: true, message: "Entrada guardada correctamente" };
  } catch (error) {
    console.error("❌ Error al guardar la entrada en la lista negra:", error.message);
    return { success: false, message: "Error al guardar la entrada: " + error.message };
  }
}


exports.getAllPDF = async (req, res) => {
  const { idCre_SolicitudWeb } = req.params;

  if (!idCre_SolicitudWeb || isNaN(parseInt(idCre_SolicitudWeb))) {
    return res.status(400).json({ message: "Parámetro idCre_SolicitudWeb inválido o faltante" });
  }

  try {
    const clientesRepo = AppDataSource.getRepository(ClientesVerificionTerrena);
    const cliente = await clientesRepo.findOne({
      where: { idCre_solicitud: parseInt(idCre_SolicitudWeb), bDomicilio: true },
    });

    if (!cliente || !cliente.idClienteVerificacion) {
      return res.status(404).json({ message: "Cliente o ID de verificación no encontrado" });
    }

    const result = await getPdfDomicilio(cliente.idClienteVerificacion);

    if (result.error) {
      console.error("Error al generar PDF:", result.error);
      return res.status(500).json({ message: result.error });
    }

    // Actualiza el campo PDFTerrena en la tabla de solicitud web
    const creSolicitudRepo = AppDataSource.getRepository(Cre_SolicitudWeb);
    await creSolicitudRepo.update(
      { idCre_SolicitudWeb: parseInt(idCre_SolicitudWeb) },
      { PDFTerrena: result.url }
    );

    return res.json({ url: result.url });

  } catch (error) {
    console.error("Error al obtener el PDF:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};