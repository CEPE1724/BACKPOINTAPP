const { AppDataSource } = require("../config/database");
const TerrenaGestionTrabajo = require("./model");
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const { handleNewLocation } = require("../../sockets/eventHandlers");
const { getPdfDomicilio } = require('../TerrenaGestionDomicilio/services');
exports.save = async (req, res) => {
  const {
    idTerrenaGestionTrabajo,
    idClienteVerificacion,
    idTerrenaTipoTrabajo,
    iTiempoTrabajo,
    iTiempoTrabajoYear,
    dIngresoTrabajo,
    ActividadTrabajo,
    TelefonoTrabajo,
    PuntoReferencia,
    PersonaEntrevistada,
    DireccionesVisitada,
    Latitud,
    Longitud,
    trabajoImages,
    CallePrincipal,
    CalleSecundaria,

  } = req.body;
  const requiredFields = [
    { name: 'idClienteVerificacion', value: idClienteVerificacion },
    { name: 'idTerrenaTipoTrabajo', value: idTerrenaTipoTrabajo },
    { name: 'iTiempoTrabajo', value: iTiempoTrabajo },
    { name: 'iTiempoTrabajoYear', value: iTiempoTrabajoYear },
    { name: 'dIngresoTrabajo', value: dIngresoTrabajo },
    { name: 'ActividadTrabajo', value: ActividadTrabajo },
    { name: 'TelefonoTrabajo', value: TelefonoTrabajo },
    { name: 'PuntoReferencia', value: PuntoReferencia },
    { name: 'PersonaEntrevistada', value: PersonaEntrevistada },
    { name: 'DireccionesVisitada', value: DireccionesVisitada },
    { name: 'Latitud', value: Latitud },
    { name: 'Longitud', value: Longitud },
    { name: 'trabajoImages', value: trabajoImages },
    { name: 'CallePrincipal', value: CallePrincipal },
    { name: 'CalleSecundaria', value: CalleSecundaria },
  ];

  for (const field of requiredFields) {
    if (!field.value) {
      return res.status(400).json({ message: `${field.name} es requerido` });
    }
  }

  try {
    const trabajoImagesString = JSON.stringify(trabajoImages);
    const ubicacion = AppDataSource.getRepository(TerrenaGestionTrabajo).create(
      {
        idClienteVerificacion,
        idTerrenaTipoTrabajo,
        iTiempoTrabajo,
        iTiempoTrabajoYear,
        dIngresoTrabajo,
        ActividadTrabajo,
        TelefonoTrabajo,
        PuntoReferencia,
        PersonaEntrevistada,
        DireccionesVisitada,
        Latitud,
        Longitud,
        trabajoImages: trabajoImagesString,
        CallePrincipal,
        CalleSecundaria,
      }
    );

    const savedLocation = await AppDataSource.getRepository(
      TerrenaGestionTrabajo
    ).save(ubicacion);
    let bTrabajo = false;
    let bDomicilio = true;
    let idTerrenaGestionDomicilioV = 0;
    let idTerrenaGestionTrabajoV = 0;

    const clientesRepo = AppDataSource.getRepository(ClientesVerificionTerrena);
    await clientesRepo.update(
      { idClienteVerificacion },
      { idTerrenaGestionTrabajo: savedLocation.idTerrenaGestionTrabajo }
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


    if (bDomicilio && idTerrenaGestionDomicilioV > 0) {
      try {
        const result = await getPdfDomicilio(idClienteVerificacion);
        
        // Verifica si la respuesta contiene un error
        if (result.error) {
          console.log("Error: ", result.error);
          return; // O maneja el error de la manera que consideres
        }
    
        // Si no hubo error, obtiene la URL del documento generado
        const urldoc = result.url;
        console.log("URL del documento:", urldoc);
        
        // Realiza la actualización del cliente
        await clientesRepo.update(
          { idClienteVerificacion },          // Condición para identificar el cliente
          { iEstado: 1, UrlGoogle: urldoc,
            FechaEnvio: new Date().toISOString().replace('T', ' ').substr(0, 19),
           }   // Los campos a actualizar
        );
    
      } catch (error) {
        console.error("Error en el proceso:", error);
        // Aquí puedes manejar errores adicionales si es necesario
      }
    }
    
    if (!bDomicilio) {
      try {
        const result = await getPdfDomicilio(idClienteVerificacion);
        
        // Verifica si la respuesta contiene un error
        if (result.error) {
          console.log("Error: ", result.error);
          return; // O maneja el error de la manera que consideres
        }
    
        // Si no hubo error, obtiene la URL del documento generado
        const urldoc = result.url;
        console.log("URL del documento:", urldoc);
        
        // Realiza la actualización del cliente
        await clientesRepo.update(
          { idClienteVerificacion },          // Condición para identificar el cliente
          { iEstado: 1, UrlGoogle: urldoc,
            FechaEnvio: new Date().toISOString().replace('T', ' ').substr(0, 19),
           }   // Los campos a actualizar
        );
    
      } catch (error) {
        console.error("Error en el proceso:", error);
        // Aquí puedes manejar errores adicionales si es necesario
      }
    }

    res.status(201).json({
      message: "TerrenaGestionTrabajo guardada correctamente",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error al guardar la TerrenaGestionTrabajo:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

exports.getAll = async (req, res) => {
  const { idTerrenaGestionTrabajo } = req.params;
  if (!idTerrenaGestionTrabajo) {
    return res
      .status(400)
      .json({ message: "idTerrenaGestionTrabajo es requerido" });
  }

  try {
    const ubicaciones = await AppDataSource.getRepository(TerrenaGestionTrabajo).find({
      where: { idTerrenaGestionTrabajo: parseInt(idTerrenaGestionTrabajo) }, // Asegúrate de que 'id' sea el nombre correcto del campo
    });

    res.json({ ubicaciones });
  } catch (error) {
    console.error("Error al obtener las ubicaciones:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

