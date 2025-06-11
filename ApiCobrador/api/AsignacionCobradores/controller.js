const { LessThanOrEqual, MoreThanOrEqual, In } = require('typeorm');
const axios = require('axios');
const { AppDataSource } = require("../config/database");
const AsignacionCobradores = require('./model');
const ClientesVerificionTerrena = require('../ClientesVerificionTerrena/model');
const DispositivosAPP = require('../DispositivosAPP/model');
const IngresoCobrador = require('../IngresoCobrador/model');
const Usuario = require('../Usuario/model');

// Función auxiliar para validar IDs
const validarIds = (idVerificador, idClienteVerificacion) =>
  idVerificador > 0 && idClienteVerificacion > 0;

// Función auxiliar para enviar notificación
const enviarNotificacion = async (idVerificador, cliente) => {
  const dispositivo = await AppDataSource.getRepository(DispositivosAPP).findOne({
    where: { idNomina: idVerificador, Empresa: 33 },
  });

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

  await axios.post('https://appservices.com.ec/cobranza/api/v1/point/NotificationUser/expo', payload);
};

// Reasignar verificación al supervisor de una asignación activa
exports.alllist = async (req, res) => {
  try {
    const { idVerificador, idClienteVerificacion } = req.body;

    if (!validarIds(idVerificador, idClienteVerificacion)) {
      return res.status(400).json({
        message: 'Parámetros idVerificador e idClienteVerificacion son requeridos y deben ser mayores que cero.',
        status: false,
        data: []
      });
    }

    const today = new Date();
    const asignacion = await AppDataSource.getRepository(AsignacionCobradores).findOne({
      where: {
        idPersonal: idVerificador,//para pruebas poner 222
        Desde: LessThanOrEqual(today),
        Hasta: MoreThanOrEqual(today),
      },
    });

    if (!asignacion) {
      return res.status(404).json({
        message: 'Verificador no tiene una asignación activa.',
        status: false,
        data: [],
      });
    }

    const cliente = await AppDataSource.getRepository(ClientesVerificionTerrena).findOne({
      where: { idClienteVerificacion },
    });

    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente de verificación no encontrado.',
        status: false,
        data: [],
      });
    }

    cliente.idAsignacionCobradores = asignacion.idAsignacionCobradores;
    cliente.idVerificador = asignacion.idSupervisor;
    await AppDataSource.getRepository(ClientesVerificionTerrena).save(cliente);

    await enviarNotificacion(idVerificador, cliente);

    res.json({
      message: 'Asignación realizada correctamente.',
      status: true,
      data: asignacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Reasignar directamente a un verificador específico
exports.UpdateCobrador = async (req, res) => {
  try {
    const { idVerificador, idClienteVerificacion } = req.body;

    if (!validarIds(idVerificador, idClienteVerificacion)) {
      return res.status(400).json({
        message: 'Parámetros idVerificador e idClienteVerificacion son requeridos y deben ser mayores que cero.',
        status: false,
        data: []
      });
    }

    const cliente = await AppDataSource.getRepository(ClientesVerificionTerrena).findOne({
      where: { idClienteVerificacion },
    });

    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente de verificación no encontrado.',
        status: false,
        data: [],
      });
    }

    cliente.idVerificador = idVerificador;
    await AppDataSource.getRepository(ClientesVerificionTerrena).save(cliente);

    await enviarNotificacion(idVerificador, cliente);

    res.json({
      message: 'Asignación realizada correctamente.',
      status: true,
      data: cliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener lista de cobradores activos bajo un supervisor
exports.searchJefeidCobrador = async (req, res) => {
  try {
    const { idVerificador } = req.query;

    if (!idVerificador || idVerificador <= 0) {
      return res.status(400).json({
        message: 'Parámetro idVerificador es requerido y debe ser mayor que cero.',
        status: false,
        data: [],
        totalRegistros: 0
      });
    }

    const today = new Date();
    const asignaciones = await AppDataSource.getRepository(AsignacionCobradores).find({
      select: ['idPersonal'],
      where: {
        idSupervisor: idVerificador,
        Desde: LessThanOrEqual(today),
        Hasta: MoreThanOrEqual(today),
      },
    });

    if (!asignaciones.length) {
      return res.status(404).json({
        message: 'No existen asignaciones activas para este supervisor.',
        status: false,
        data: [],
        totalRegistros: 0,
      });
    }

    const ids = asignaciones.map(a => a.idPersonal);
    const cobradores = await AppDataSource.getRepository(IngresoCobrador).find({
      where: { idIngresoCobrador: In(ids) },
      order: { Nombre: 'ASC' },
    });

    if (!cobradores.length) {
      return res.status(404).json({
        message: 'No se encontraron cobradores asociados a las asignaciones.',
        status: false,
        data: [],
        totalRegistros: 0,
      });
    }

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

    if (!idVerificador || idVerificador <= 0) {
      return res.status(400).json({
        message: 'Parámetro idVerificador es requerido y debe ser mayor que cero.',
        status: false,
        data: []
      });
    }

    const verificador = await AppDataSource.getRepository(IngresoCobrador).findOne({
      where: { idIngresoCobrador: idVerificador },
    });

    if (!verificador) {
      return res.status(200).json({
        message: 'Supervisor no encontrado.',
        status: false,
        data: 0,
      });
    }

    const usuario = await AppDataSource.getRepository(Usuario).findOne({
      where: { Nombre: verificador.Codigo },
    });

    if (!usuario) {
      return res.status(200).json({
        message: 'Usuario no encontrado.',
        status: false,
        data: 0,
      });
    }

    const isSupervisor = usuario.idGrupo === 33 ? 1 : 0;

    res.json({
      message: 'Supervisor encontrado.',
      status: true,
      data: isSupervisor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
