const { AppDataSource } = require("../config/database");
const TerrenaGestionDomicilio = require("./model");
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const Cre_SolicitudWeb = require("../Cre_SolicitudWeb/model");
const DocTerrena = require("../DocTerrena/controller");
const { getPdfDomicilio } = require('./services');
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
      const creSolicitudRepo = AppDataSource.getRepository(Cre_SolicitudWeb);
      await creSolicitudRepo.update(
        { idCre_SolicitudWeb: idCre_solicitud },
        { idEstadoVerificacionDomicilio: 2 }
      );
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