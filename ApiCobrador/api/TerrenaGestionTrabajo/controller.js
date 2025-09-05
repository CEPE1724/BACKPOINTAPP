const { AppDataSource } = require("../config/database");
const TerrenaGestionTrabajo = require("./model");
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const Cre_SolicitudWeb = require("../Cre_SolicitudWeb/model");
const { handleNewLocation } = require("../../sockets/eventHandlers");
const { getPdfDomicilio } = require('../TerrenaGestionDomicilio/services');
const DispositivosAPP = require("../DispositivosAPP/model");
const listaNegraCedula = require("../ListaNegraCedula/model");
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
    direccionCoincide,
    tipoVerificacion,
    Observacion

  } = req.body;
  const requiredFields = [
    { name: 'idClienteVerificacion', value: idClienteVerificacion },
    { name: 'idTerrenaTipoTrabajo', value: idTerrenaTipoTrabajo },
    { name: 'direccionCoincide', value: direccionCoincide },
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
    { name: 'tipoVerificacion', value: tipoVerificacion }
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
        direccionCoincide,
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
        tipoVerificacion,
        Observacion
      }
    );

    const savedLocation = await AppDataSource.getRepository(
      TerrenaGestionTrabajo
    ).save(ubicacion);
    let bTrabajo = false;
    let bDomicilio = true;
    let idTerrenaGestionDomicilioV = 0;
    let idTerrenaGestionTrabajoV = 0;
    let EstadoVerificacionTerrena = tipoVerificacion === 2 ? 2 : 3;
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
        // const result = await getPdfDomicilio(idClienteVerificacion);

        // Verifica si la respuesta contiene un error
        /* if (result.error) {
           console.log("Error: ", result.error);
           return; // O maneja el error de la manera que consideres
         }*/

        // Si no hubo error, obtiene la URL del documento generado
        /*const urldoc = result.url;
        console.log("URL del documento:", urldoc);*/

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

    if (!bDomicilio) {
      try {
        /* const result = await getPdfDomicilio(idClienteVerificacion);
 
         // Verifica si la respuesta contiene un error
        /* if (result.error) {
           console.log("Error: ", result.error);
           return; // O maneja el error de la manera que consideres
         }*/

        // Si no hubo error, obtiene la URL del documento generado
        /* const urldoc = result.url;
         console.log("URL del documento:", urldoc);*/

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
          idEstadoVerificacionTerrena: EstadoVerificacionTerrena,
          // Estado: tipoVerificacion === 2 ? creSolicitudRepo.Estado : 7, // undefined no actualiza
          //Resultado: tipoVerificacion === 2 ? creSolicitudRepo.Resultado : 0,
        }
      );
      // si tipoVerificacion es 3,5,7 pasar  alista negra
      /*  const dispositivoRepo = AppDataSource.getRepository(DispositivosAPP);
        const codigoVerificador = await dispositivoRepo.findOne({
          where: { idNomina: clienteVerificacion.idVerificador, Empresa: 33 },
          select: ['UsuarioAPP'],
        });
        
        if (tipoVerificacion === 3 || tipoVerificacion === 5 || tipoVerificacion === 7) {
          const listaNegraResult = await ListaNegraCedulaLis(
            cliente.Ruc,
            'Enviado desde la APP de TerrenaGestionTrabajo',
            true,
             codigoVerificador.UsuarioAPP || 'Desconocido'
          );
          if (!listaNegraResult.success) {
            console.error("Error al guardar en la lista negra:", listaNegraResult.message);
          }
        }*/
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

async function ListaNegraCedulaLis(Cedula, Observacion, Activo = true, Usuario = 'Desconocido') {
  const listaNegraRepo = AppDataSource.getRepository(listaNegraCedula);

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
