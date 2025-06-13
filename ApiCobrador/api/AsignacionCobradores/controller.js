const { LessThanOrEqual, MoreThanOrEqual, In } = require('typeorm');
const axios = require('axios');
const { AppDataSource } = require("../config/database");
const AsignacionCobradores = require('./model');
const ClientesVerificionTerrena = require('../ClientesVerificionTerrena/model');
const DispositivosAPP = require('../DispositivosAPP/model');
const IngresoCobrador = require('../IngresoCobrador/model');
const Usuario = require('../Usuario/model');
const TiempoSolicitudesWeb = require('../TiempoSolicitudesWeb/model');


// Validar IDs
const validarIds = (idVerificador, idClienteVerificacion) => idVerificador > 0 && idClienteVerificacion > 0;

// Insertar registro de tiempo de solicitud web
async function insertarTiempoSolicitudWeb({ idCre_SolicitudWeb, Tipo, Usuario, Telefono, ID_ESTADO_VERIFICACION_DOCUMENTAL }) {
  try {
    await AppDataSource.getRepository(TiempoSolicitudesWeb).save({
      idEstadoVerificacionDocumental: ID_ESTADO_VERIFICACION_DOCUMENTAL,
      idCre_SolicitudWeb,
      Tipo,
      Usuario,
      Telefono,
    });
    console.log('Tiempo de solicitud web insertado correctamente');
  } catch (error) {
    console.error('Error al insertar tiempo de solicitud web:', error);
  }
}

// Enviar notificación push
async function enviarNotificacion(idVerificador, cliente) {
  const dispositivo = await AppDataSource.getRepository(DispositivosAPP).findOne({
    where: { idNomina: idVerificador, Empresa: 33 },
  });
console.log('Dispositivo encontrado:', dispositivo);
  if (!dispositivo?.TokenExpo) return;

  const fechaHoraEcuador = new Date().toLocaleString('es-EC', {
    timeZone: 'America/Guayaquil',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const payload = {
    tokens: [dispositivo.TokenExpo],
    notification: {
      type: 'info',
      title: '🔁 Reasignación de Verificación realizada.',
      body: `📅 Fecha y hora: ${fechaHoraEcuador}
👤 Cliente: ${cliente.Nombres}  
🪪 Cédula: ${cliente.Ruc}  
📞 Teléfono: ${cliente.Celular}  
🏬 Almacén: ${cliente.Almacen}
Por favor, verifica la nueva asignación en la aplicación.`,
      url: "",
      empresa: "CREDI",
    },
  };

  try {
    await axios.post('https://appservices.com.ec/cobranza/api/v1/point/NotificationUser/expo', payload);
  } catch (error) {
    console.error('Error enviando notificación:', error);
  }
}

// Manejo de errores y respuestas
const responseError = (res, status, message, data = []) =>
  res.status(status).json({ message, status: false, data });

// Manejo de respuestas exitosas
const responseSuccess = (res, message, data) =>
  res.json({ message, status: true, data });

// Reasignar verificación al supervisor de una asignación activa
exports.alllist = async (req, res) => {
  try {
    const { idVerificador, idClienteVerificacion } = req.body;

    if (!validarIds(idVerificador, idClienteVerificacion))
      return responseError(res, 400, 'Parámetros idVerificador e idClienteVerificacion son requeridos y deben ser mayores que cero.');

    const today = new Date();
    const asignacion = await AppDataSource.getRepository(AsignacionCobradores).findOne({
      where: {
        idPersonal: idVerificador, // para pruebas poner 222
        Desde: LessThanOrEqual(today),
        Hasta: MoreThanOrEqual(today),
      },
    });

    if (!asignacion)
      return responseError(res, 404, 'Verificador no tiene una asignación activa.');

    const clienteRepo = AppDataSource.getRepository(ClientesVerificionTerrena);
    const cliente = await clienteRepo.findOne({ where: { idClienteVerificacion } });

    if (!cliente)
      return responseError(res, 404, 'Cliente de verificación no encontrado.');

    cliente.idAsignacionCobradores = asignacion.idAsignacionCobradores;
    cliente.idVerificador = asignacion.idSupervisor;
    await clienteRepo.save(cliente);

    const ingresoCobradorRepo = AppDataSource.getRepository(IngresoCobrador);

    const codigoVerificador = await ingresoCobradorRepo.findOne({
      where: { idIngresoCobrador: idVerificador },
      select: ['Codigo'],
    });
    if (!codigoVerificador)
      return responseError(res, 404, 'Verificador no encontrado.');

    const nombreJefe = await ingresoCobradorRepo.findOne({
      where: { idIngresoCobrador: asignacion.idSupervisor },
      select: ['Nombre'],
    });
    if (!nombreJefe)
      return responseError(res, 404, 'Supervisor no encontrado.');

    const Tipo = cliente.bDomicilio ? 4 : 5; // 4: Domicilio, 5: Trabajo
    await insertarTiempoSolicitudWeb({
      idCre_SolicitudWeb: cliente.idCre_solicitud,
      Tipo,
      Usuario: codigoVerificador.Codigo,
      Telefono: nombreJefe.Nombre,
      ID_ESTADO_VERIFICACION_DOCUMENTAL: 4, // Asignación realizada
    });

    await enviarNotificacion(idVerificador, cliente);

    responseSuccess(res, 'Asignación realizada correctamente.', asignacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Reasignar directamente a un verificador específico
exports.UpdateCobrador = async (req, res) => {
  try {
    const { idVerificador, idClienteVerificacion } = req.body;

    if (!validarIds(idVerificador, idClienteVerificacion))
      return responseError(res, 400, 'Parámetros idVerificador e idClienteVerificacion son requeridos y deben ser mayores que cero.');

    const clienteRepo = AppDataSource.getRepository(ClientesVerificionTerrena);
    const cliente = await clienteRepo.findOne({ where: { idClienteVerificacion } });

    if (!cliente)
      return responseError(res, 404, 'Cliente de verificación no encontrado.');
    const idVerificadorafter = cliente.idVerificador;
    cliente.idVerificador = idVerificador;
    await clienteRepo.save(cliente);

    const ingresoCobradorRepo = AppDataSource.getRepository(IngresoCobrador);

    const codigoVerificador = await ingresoCobradorRepo.findOne({
      where: { idIngresoCobrador: idVerificadorafter },
      select: ['Codigo'],
    });
    if (!codigoVerificador)
      return responseError(res, 404, 'Verificador no encontrado.');

    const nombreJefe = await ingresoCobradorRepo.findOne({
      where: { idIngresoCobrador: idVerificador },
      select: ['Nombre'],
    });
    if (!nombreJefe)
      return responseError(res, 404, 'Supervisor no encontrado.');
    const Tipo = cliente.bDomicilio ? 4 : 5; // 4: Domicilio, 5: Trabajo
    await insertarTiempoSolicitudWeb({
      idCre_SolicitudWeb: cliente.idCre_solicitud,
      Tipo,
      Usuario: codigoVerificador.Codigo,
      Telefono: nombreJefe.Nombre,
      ID_ESTADO_VERIFICACION_DOCUMENTAL: 3, // Asignación realizada
    });




    await enviarNotificacion(idVerificador, cliente);

    responseSuccess(res, 'Asignación realizada correctamente.', cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener lista de cobradores activos bajo un supervisor
exports.searchJefeidCobrador = async (req, res) => {
  try {
    const { idVerificador } = req.query;

    if (!idVerificador || idVerificador <= 0)
      return responseError(res, 400, 'Parámetro idVerificador es requerido y debe ser mayor que cero.', [], 0);

    const today = new Date();
    const asignaciones = await AppDataSource.getRepository(AsignacionCobradores).find({
      select: ['idPersonal'],
      where: {
        idSupervisor: idVerificador,
        Desde: LessThanOrEqual(today),
        Hasta: MoreThanOrEqual(today),
      },
    });

    if (!asignaciones.length)
      return responseError(res, 404, 'No existen asignaciones activas para este supervisor.', [], 0);

    const ids = asignaciones.map(a => a.idPersonal);
    const cobradores = await AppDataSource.getRepository(IngresoCobrador).find({
      where: { idIngresoCobrador: In(ids) },
      order: { Nombre: 'ASC' },
    });

    if (!cobradores.length)
      return responseError(res, 404, 'No se encontraron cobradores asociados a las asignaciones.', [], 0);

    res.json({
      message: 'Asignaciones encontradas.',
      status: true,
      data: cobradores,
      totalRegistros: cobradores.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Verifica si un verificador es supervisor
exports.searchSupervisor = async (req, res) => {
  try {
    const { idVerificador } = req.query;

    if (!idVerificador || idVerificador <= 0)
      return responseError(res, 400, 'Parámetro idVerificador es requerido y debe ser mayor que cero.');

    const verificador = await AppDataSource.getRepository(IngresoCobrador).findOne({
      where: { idIngresoCobrador: idVerificador },
    });

    if (!verificador)
      return res.status(200).json({
        message: 'Supervisor no encontrado.',
        status: false,
        data: 0,
      });

    const usuario = await AppDataSource.getRepository(Usuario).findOne({
      where: { Nombre: verificador.Codigo },
    });

    if (!usuario)
      return res.status(200).json({
        message: 'Usuario no encontrado.',
        status: false,
        data: 0,
      });

    const isSupervisor = usuario.idGrupo === 33 ? 1 : 0;

    responseSuccess(res, 'Supervisor encontrado.', isSupervisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
