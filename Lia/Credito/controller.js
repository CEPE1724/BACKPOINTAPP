const Parentesco = require('./Parentesco/model')
// Modelos de ubicaciones
const Cre_Provincia = require('./Provincia/model')
const Cre_Canton = require('./Canton/model')
const Cre_Parroquia = require('./Parroquia/model')
const Cre_Barrio = require('./Barrio/model')
const axios = require('axios')
const { AppDataSource } = require('../../ApiCobrador/api/config/database')
const WebSolicitudGrande = require('./Cre_SolicitudGrande/model')
const Cre_SolicitudWeb = require('../../ApiCobrador/api/Cre_SolicitudWeb/model')
const { uploadImage } = require('./cloudeService/cloud')
const CreReferenciasClientesWeb = require('./Cre_ReferenciasWeb/model')
const qs = require('qs')
const ActividadEconomica = require('../../ApiCobrador/api/Cre_ActividadEconomica/model')
// Constante global para la API de carrito
const API_URL ='https://ecommerce.appservices.com.ec/api/v1/'

// Utilidades
function splitNombreCompleto(nombreCompleto = '') {
  const partes = nombreCompleto.trim().split(' ')
  let ApellidoPaterno = '',
    ApellidoMaterno = '',
    PrimerNombre = '',
    SegundoNombre = ''
  if (partes.length >= 4) {
    ApellidoPaterno = partes[0]
    ApellidoMaterno = partes[1]
    PrimerNombre = partes[2]
    SegundoNombre = partes.slice(3).join(' ')
  } else if (partes.length === 3) {
    ApellidoPaterno = partes[0]
    ApellidoMaterno = partes[1]
    PrimerNombre = partes[2]
  } else if (partes.length === 2) {
    ApellidoPaterno = partes[0]
    PrimerNombre = partes[1]
  } else if (partes.length === 1) {
    ApellidoPaterno = partes[0]
  }
  return { ApellidoPaterno, ApellidoMaterno, PrimerNombre, SegundoNombre }
}

function getIdProductoByGrupo(idWEB_Grupo) {
  switch (idWEB_Grupo) {
    case 1: /// Audio y video
      return 6 /// Televisor
    case 2: /// Celulares y tablets
      return 3 /// Movilidad
    case 3: /// Computo y tecnologia
      return 4 // Portatil
    case 4: //// Electrodomestico
      return 1 /// Combo
  }
}

function buildDtoFinal(
  { detalle, idSituacionLaboral, dto, nombres, carrito },
  idWebCategoria
) {
  let idProductos
  if (idWebCategoria === 74) {
    idProductos = 1
  } else {
    idProductos = getIdProductoByGrupo(detalle.idWEB_Grupo)
  }
  // Lógica de checks por situación laboral
  let bAfiliado = false
  let bTieneRuc = false
  if (Number(idSituacionLaboral) === 1) {
    bAfiliado = true
    bTieneRuc = false
  } else if (Number(idSituacionLaboral) === 2) {
    bAfiliado = false
    bTieneRuc = false
  }
  return {
    idProductos,
    idCre_TiempoVivienda: 1,
    idSituacionLaboral,
    idActEconomina: 213,
    idCre_Tiempo: 1,
    bAfiliado,
    bTieneRuc,
    Foto: 'prueba',
    bTerminosYCondiciones: true,
    bPoliticas: true,
    Celular: dto.Celular || '1',
    Bodega: 82,
    idVendedor: 205,
    idCompraEncuesta: 3, // Whatsapp
    Cedula: dto.cedula,
    ApellidoPaterno: nombres.ApellidoPaterno || 'XXX',
    ApellidoMaterno: nombres.ApellidoMaterno || 'XXX',
    PrimerNombre: nombres.PrimerNombre || 'XXX',
    SegundoNombre: nombres.SegundoNombre || 'XXX'
  }
}
// Configuración de Cogno
const keycloakConfig = {
  url:
    process.env.KEYCLOAK_URL ||
    'http://app.cognoconsultas.com/keycloak/auth/realms/point/protocol/openid-connect/token',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'login-data-services',
  username: process.env.KEYCLOAK_USERNAME || 'dpozo@point.com.ec',
  password: process.env.KEYCLOAK_PASSWORD
}

const apiEndpoints = {
  personalData: 'http://app.cognoconsultas.com/consultas/pn_inf_basica/',
  workData: 'http://app.cognoconsultas.com/consultas/pn_trabajos/'
}

async function getCognoToken() {
  // console.log('entra a obtner el token')
  const data = qs.stringify({
    client_id: keycloakConfig.clientId,
    username: keycloakConfig.username,
    password: keycloakConfig.password,
    grant_type: 'password',
    scope: 'email profile'
  })
  // console.log('data', data)
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  // console.log('headers', headers)
  const resp = await axios.post(keycloakConfig.url, data, { headers })
  // console.log('resp', resp)
  if (!resp.data || !resp.data.access_token)
    throw new Error('No se obtuvo token de Cogno')
  return resp.data.access_token
}

async function obtenerCarritoCompleto(idWEB_Carrito) {
  const url = `${API_URL}carrito-compra/obtener-carrito-lhia/${idWEB_Carrito}`

  try {
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.data || response.data.status !== 200) {
      throw new Error(response.data?.message || 'Error al obtener carrito')
    }
    return response.data.data
  } catch (error) {
    throw new Error(error.message || 'Error al obtener carrito')
  }
}
async function getPersonalData(token, cedula) {
  const url = `${apiEndpoints.personalData}${cedula}`
  const resp = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return resp.data
}

async function getWorkData(token, cedula) {
  const url = `${apiEndpoints.workData}${cedula}`
  const resp = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return resp.data
}

exports.registrarSolicitudCredito = async (req, res) => {
  const dto = req.body
  // Validaciones iniciales
  if (!dto.idCarrito || !dto.cedula || !dto.Celular) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' })
  }
  // Validar que cedula y celular sean numéricos y de máximo 10 dígitos
  const soloNumeros = /^\d{1,10}$/;
  if (!soloNumeros.test(dto.cedula)) {
    return res.status(400).json({ error: 'La cédula debe ser numérica y máximo 10 dígitos' });
  }
  if (!soloNumeros.test(dto.Celular)) {
    return res.status(400).json({ error: 'El celular debe ser numérico y máximo 10 dígitos' });
  }
  // Obtener carrito
  let carrito
  try {
    carrito = await obtenerCarritoCompleto(dto.idCarrito)
  } catch (e) {
    return res
      .status(404)
      .json({ error: 'Carrito no encontrado', detalle: e.message })
  }
  const detalles = carrito.Detalles
  if (!Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ error: 'El carrito no tiene detalles' })
  }
  // Validar método de pago (debe ser 9 para crédito)
  const idWebMetodoPago = carrito.MetodoPago;
  if (idWebMetodoPago !== 9) {
    return res.status(400).json({
      error: 'El método de pago del carrito no es crédito. Solo se permite continuar si el método de pago es crédito',
    });
  }
  const idWebCategoria = detalles[0].idWEB_Categoria
  if (idWebCategoria === 73) {
    return res.status(400).json({ error: 'Categoría no permitida (Baratazo)' })
  }

  if (idWebCategoria === 74) {
    /// en este caso es oferta el idItem es 1
    // Lógica específica para la categoría 74
    const idProductos = 1
  }
  // Obtener token y datos externos
  let token, datosPersona, trabajo
  // console.log('Antes de try')
  // console.log('datos cogno token', keycloakConfig)
  try {
    token = await getCognoToken()
    // console.log('getCognoToken')
    datosPersona = await getPersonalData(token, dto.cedula)
    // console.log(datosPersona, 'datosPersonales')
    trabajo = await getWorkData(token, dto.cedula)
    // console.log(trabajo, 'Datos Trabajo')
    // Validar si no se encontró información de la persona o el servicio devolvió error
    if (!datosPersona || datosPersona.estado?.codigo === 'ERROR' || !trabajo || trabajo.estado?.codigo === 'ERROR') {
      return res.status(400).json({ error: 'No se encontró información para la cédula ingresada. Ingrese una cédula válida o vuelva a intentar más tarde.' });
    }
  } catch (e) {
    return res
      .status(400)
      .json({ error: 'No se encontró información para la cédula ingresada. Ingrese una cédula válida o vuelva a intentar más tarde.' })
  }

  // console.log(trabajo, 'Datos Persona')
  // Nombres y apellidos
  let nombres = {
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    PrimerNombre: '',
    SegundoNombre: ''
  }
  let fechaNacimiento = ''
  if (datosPersona && datosPersona.personaNatural) {
    nombres = splitNombreCompleto(datosPersona.personaNatural.nombre || '')
    fechaNacimiento = datosPersona.personaNatural.fechaNacimiento || ''
  }
  // Situación laboral
  let idSituacionLaboral = 2
  if (
    trabajo &&
    Array.isArray(trabajo.trabajos) &&
    trabajo.trabajos.length > 0
  ) {
    const hoy = Date.now()
    const vigente = trabajo.trabajos.some((t) => {
      // Si fechaAfiliacionHasta existe y es mayor o igual a hoy, está vigente
      if (t.fechaAfiliacionHasta !== null && t.fechaAfiliacionHasta >= hoy) {
        return true
      }
      // Si fechaAfiliacionHasta es nulo, pero fechaActualizacion es mayor o igual a hoy, está vigente
      if (t.fechaAfiliacionHasta === null && t.fechaActualizacion >= hoy) {
        return true
      }
      return false
    })
    if (vigente) {
      idSituacionLaboral = 1
    } else {
      idSituacionLaboral = 2
    }
  }
  // DTO final
  const detalle = detalles[0] || {}
  const dtoFinal = buildDtoFinal(
    { detalle, idSituacionLaboral, dto, nombres, carrito },
    idWebCategoria
  )
  try {
    const respuesta = await axios.post(
      "https://backregistrocivil.appservices.com.ec/api/v1/cre-solicitud-web/web",
      dtoFinal,
      { headers: { 'Content-Type': 'application/json' } }
    )
    const dataExterna = respuesta.data
    const dataSolicitud = dataExterna?.data
    const idCre_SolicitudWeb = dataSolicitud?.idCre_SolicitudWeb
    if (!idCre_SolicitudWeb) {
      console.error(
        'Respuesta externa sin idCre_SolicitudWeb:',
        JSON.stringify(dataExterna)
      )
      return res.status(500).json({
        ///error: "No se obtuvo idCre_SolicitudWeb de la respuesta externa",
        detalle: dataExterna,
      });
    }

    // Esperar unos segundos para que el proceso interno actualice el estado
    await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 segundos

    // Consultar el estado actualizado en Cre_SolicitudWeb
    const repoCreSolicitudWeb = AppDataSource.getRepository(Cre_SolicitudWeb)
    const solicitudActualizada = await repoCreSolicitudWeb.findOne({
      where: { idCre_SolicitudWeb }
    })
    if (!solicitudActualizada) {
      return res
        .status(404)
        .json({ error: 'No se encontró la solicitud en Cre_SolicitudWeb.' })
    }

    const estadoFinal = solicitudActualizada.Estado
    // console.log(solicitudActualizada, 'Estado Final')
    // Consultar cuota asignada en la base de datos
    const repo = AppDataSource.getRepository(WebSolicitudGrande)
    const registro = await repo.findOne({ where: { idCre_SolicitudWeb } })
    if (!registro) {
      return res
        .status(404)
        .json({ error: 'No se encontró la solicitud en WebSolicitudGrande.' })
    }

    // console.log(registro, 'Registro Consulta')
    const cuotaAsignada = registro.CuotaAsignada
    const precioCuotaCarrito = carrito.PrecioCuota
    // console.log(precioCuotaCarrito, 'Cuota Carrito')
    // console.log(cuotaAsignada, 'Cuota Asignada')
    // console.log(estadoFinal, 'Estado Final')

    // Mapeo de estados
    const estadosTextuales = {
      1: 'Pre-Aprobado',
      2: 'Aprobado',
      3: 'Anulado',
      4: 'Rechazado',
      5: 'No aplica',
      6: 'Facturado',
      7: 'Caducado'
    }
    const tituloProducto = detalle.Titulo || 'producto'
    // Mensajes personalizados según situación laboral
    let mensaje
    if (cuotaAsignada >= precioCuotaCarrito && estadoFinal === 1) {
      if (idSituacionLaboral === 1) {
        // Dependiente
        mensaje = `¡Felicitaciones! Tienes un crédito pre aprobado, la cuota del carritos ${tituloProducto} que escogiste al inicio (incluyendo garantías) es de $${precioCuotaCarrito}. Escoge las siguientes opciones.`
      } else if (idSituacionLaboral === 2) {
        // Informal
        mensaje = `¡Felicitaciones! Tienes un crédito pre aprobado.`
      } else {
        mensaje = `¡Felicitaciones! Tienes un crédito pre aprobado.`
      }
      return res.json({
        aplica: true,
        mensaje,
        SituacionLaboral: idSituacionLaboral,
        idSolicitud: idCre_SolicitudWeb
      })
    } else {
      // Mensaje de no aplica
      if (idSituacionLaboral === 2) {
        mensaje =
          'Por esta ocasión no hemos podido aprobar tu solicitud, sin embargo, me complace en ofrecerte el 3% de descuento en tu compra de contado.'
      } else {
        mensaje = 'No aplica al crédito directo.'
      }
      return res.json({
        aplica: false,
        mensaje
        // cuotaAsignada,
        // precioTotalCarrito: precioCuotaCarrito,
        // idCre_SolicitudWeb,
        // estado: estadosTextuales[estadoFinal] || estadoFinal
      })
    }
  } catch (error) {
    return res.status(500).json({
      error:
        'Error enviando la solicitud al endpoint externo o consultando la base de datos',
      detalle: error.response?.data || error.message
    })
  }
}

// Cambiar método de pago LHIA
exports.cambiarMetodoPagoLHIA = async (req, res) => {
  const { metodoPago, idWEB_Carrito } = req.body
  if (!metodoPago || !idWEB_Carrito) {
    return res.status(400).json({
      status: 400,
      message: 'Faltan datos para cambiar el método de pago.',
      data: null
    })
  }
  const url = `${API_URL}carrito-compra/cambiar-metodo-pago-lhia`
  try {
    const response = await axios.patch(
      url,
      {
        metodoPago,
        idWEB_Carrito
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    return res.status(200).json({
      status: 200,
      message: 'Método de pago cambiado correctamente.',
      data: response.data
    })
  } catch (error) {
    console.error('Error al cambiar el método de pago:', error)
    if (error.response?.status === 404) {
      return res.status(404).json({
        status: 404,
        message: error.response.data?.message || 'No encontrado',
        data: null
      })
    }
    if (error.response?.status === 400) {
      return res.status(400).json({
        status: 400,
        message: error.response.data?.message || 'Solicitud incorrecta',
        data: null
      })
    }
    return res.status(500).json({
      status: 500,
      message: 'Error interno al cambiar el método de pago.',
      data: null
    })
  }
}

// ==========================
// Helpers de validación
// ==========================
function validarDireccion(direccion) {
  const campos = [
    'IdProvinciaDomicilio',
    'IdCantonDomicilio',
    'IdParroquiaDomicilio',
    'idBarrioDomicilio',
    'CallePrincipal',
    'NumeroCasa',
    'CalleSecundaria',
    'ReferenciaUbicacion',
    'Celular'
  ];
  for (const campo of campos) {
    if (direccion[campo] === undefined || direccion[campo] === null || direccion[campo] === '') {
      return { valido: false, mensaje: `El campo ${campo} es obligatorio.` };
    }
  }
  // Validar rangos de IDs
  const idProvincia = Number(direccion.IdProvinciaDomicilio);
  if (!(idProvincia >= 1 && idProvincia <= 25)) {
    return { valido: false, mensaje: 'Provincia no válida.' };
  }
  const idCanton = Number(direccion.IdCantonDomicilio);
  if (!(idCanton >= 1 && idCanton <= 232)) {
    return { valido: false, mensaje: 'Cantón no válido.' };
  }
  const idParroquia = Number(direccion.IdParroquiaDomicilio);
  if (!(idParroquia >= 1 && idParroquia <= 1000)) {
    return { valido: false, mensaje: 'Parroquia no válida.' };
  }
  const idBarrio = Number(direccion.idBarrioDomicilio);
  if (!(idBarrio >= 1 && idBarrio <= 15034)) {
    return { valido: false, mensaje: 'Barrio no válido.' };
  }
  // Validar celular: numérico y exactamente 10 dígitos
  if (!(typeof direccion.Celular === 'string' && /^\d{10}$/.test(direccion.Celular))) {
    return { valido: false, mensaje: 'El celular debe ser numérico y de 10 dígitos.' };
  }
  return { valido: true };
}

function validarReferencia(ref) {
  const obligatorios = [
    'nombre',
    'apellido',
    'celular',
    'direccion',
    'idParentesco'
  ];
  const provincia = ['idProvincia', 'idpronvicia'];
  const canton = ['idCanton', 'IdCanton'];

  for (const campo of obligatorios) {
    if (ref[campo] === undefined || ref[campo] === null || ref[campo] === '') {
      return { valido: false, mensaje: `El campo ${campo} es obligatorio en la referencia.` };
    }
  }
  let idProvincia = null;
  let tieneProvincia = false;
  for (const key of provincia) {
    if (ref[key] !== undefined && ref[key] !== null && ref[key] !== '') {
      idProvincia = Number(ref[key]);
      tieneProvincia = true;
      break;
    }
  }
  if (!tieneProvincia) {
    return { valido: false, mensaje: 'El campo idProvincia es obligatorio en la referencia.' };
  }
  let idCanton = null;
  let tieneCanton = false;
  for (const key of canton) {
    if (ref[key] !== undefined && ref[key] !== null && ref[key] !== '') {
      idCanton = Number(ref[key]);
      tieneCanton = true;
      break;
    }
  }
  if (!tieneCanton) {
    return { valido: false, mensaje: 'El campo idCanton es obligatorio en la referencia.' };
  }
  const idParentesco = Number(ref.idParentesco);
  if (!(idProvincia >= 1 && idProvincia <= 25)) {
    return { valido: false, mensaje: 'Provincia de la referencia no válida.' };
  }
  if (!(idCanton >= 1 && idCanton <= 232)) {
    return { valido: false, mensaje: 'Cantón de la referencia no válido.' };
  }
  if (!(idParentesco >= 1 && idParentesco <= 21)) {
    return { valido: false, mensaje: 'Parentesco de la referencia no válido.' };
  }
  if (!(typeof ref.celular === 'string' && /^\d{10}$/.test(ref.celular))) {
    return { valido: false, mensaje: 'El celular de la referencia debe ser numérico y de 10 dígitos.' };
  }
  return { valido: true };
}

// ==========================
// Helpers de procesos comunes
// ==========================
async function guardarDireccionYDatos(
  repo,
  idCre_SolicitudWeb,
  direccionPersona,
  extra = {}
) {
  await repo.update(
    { idCre_SolicitudWeb },
    {
      idProvinciaDomicilio: direccionPersona.IdProvinciaDomicilio,
      idCantonDomicilio: direccionPersona.IdCantonDomicilio,
      idParroquiaDomicilio: direccionPersona.IdParroquiaDomicilio,
      idBarrioDomicilio: direccionPersona.idBarrioDomicilio,
      CallePrincipal: direccionPersona.CallePrincipal,
      NumeroCasa: direccionPersona.NumeroCasa,
      CalleSecundaria: direccionPersona.CalleSecundaria,
      ReferenciaUbicacion: direccionPersona.ReferenciaUbicacion,
      TelefonoDomicilio: direccionPersona.TelefonoDomicilio || '',
      Celular: direccionPersona.Celular,
      ...extra // Datos adicionales (actividad económica, ingresos, etc.)
    }
  )
}

async function subirImagenes(files) {
  const [cedulaFrente, cedulaDorso, fotoRostro] = await Promise.all([
    uploadImage(
      files.cedulaFrente[0].buffer,
      files.cedulaFrente[0].originalname
    ),
    uploadImage(files.cedulaDorso[0].buffer, files.cedulaDorso[0].originalname),
    uploadImage(files.fotoRostro[0].buffer, files.fotoRostro[0].originalname)
  ])
  return { cedulaFrente, cedulaDorso, fotoRostro }
}

async function guardarReferencias(repo, idCre_SolicitudWeb, referencias) {
  const nuevasReferencias = referencias.map((ref) =>
    repo.create({
      idCre_SolicitudWeb,
      ApellidoPaterno: ref.apellido,
      PrimerNombre: ref.nombre,
      Celular: ref.celular,
      Direccion: ref.direccion,
      idProvincia: ref.idProvincia || ref.idpronvicia || null,
      idCanton: ref.idCanton || ref.IdCanton || null,
      idParentesco: ref.idParentesco || null
    })
  )
  await repo.save(nuevasReferencias)
}

async function actualizarFotos(
  repoSolicitud,
  repoGrande,
  idCre_SolicitudWeb,
  urls
) {
  await repoSolicitud.update({ idCre_SolicitudWeb }, { Foto: urls.fotoRostro })
  await repoGrande.update(
    { idCre_SolicitudWeb },
    { CedulaFrente: urls.cedulaFrente, CedulaDorso: urls.cedulaDorso }
  )
}

// ==========================
// Controladores
// ==========================
exports.registrarDependiente = async (req, res) => {
  try {
    // Parsear datos
    let referencias = JSON.parse(req.body.referencias || '[]')
    const files = req.files
    const idCre_SolicitudWeb = req.body.idCre_SolicitudWeb

    // Validar dirección
    let direccionPersona = null
    if (req.body.direccion) {
      direccionPersona =
        typeof req.body.direccion === 'string'
          ? JSON.parse(req.body.direccion)
          : req.body.direccion

      const validacionDireccion = validarDireccion(direccionPersona);
      if (!validacionDireccion.valido) {
        return res.status(400).json({ mensaje: validacionDireccion.mensaje });
      }
    }

    // Validaciones generales
    if (!Array.isArray(referencias) || referencias.length < 2)
      return res
        .status(400)
        .json({ mensaje: 'Debes enviar al menos dos referencias personales.' })

    if (!files?.cedulaFrente || !files?.cedulaDorso || !files?.fotoRostro)
      return res
        .status(400)
        .json({ mensaje: 'Debes enviar las fotos requeridas.' })

    for (const ref of referencias) {
      const validacionRef = validarReferencia(ref);
      if (!validacionRef.valido) {
        return res.status(400).json({ mensaje: validacionRef.mensaje });
      }
    }

    if (!idCre_SolicitudWeb)
      return res.status(400).json({ mensaje: 'Falta el idCre_SolicitudWeb.' })

    // Validar dependiente
    const repoGrande = AppDataSource.getRepository(WebSolicitudGrande)
    const solicitud = await repoGrande.findOne({
      where: { idCre_SolicitudWeb }
    })
    if (solicitud.idSituacionLaboral !== 1)
      return res
        .status(400)
        .json({ mensaje: 'Solo se permite registrar dependientes.' })

    // Guardar dirección
    if (direccionPersona)
      await guardarDireccionYDatos(
        repoGrande,
        idCre_SolicitudWeb,
        direccionPersona
      )

    // Subir imágenes
    const urls = await subirImagenes(files)

    // Guardar referencias
    const repoRefs = AppDataSource.getRepository('CreReferenciasClientesWeb')
    await guardarReferencias(repoRefs, idCre_SolicitudWeb, referencias)

    // Actualizar fotos
    const repoSolicitud = AppDataSource.getRepository(Cre_SolicitudWeb)
    await actualizarFotos(repoSolicitud, repoGrande, idCre_SolicitudWeb, urls)

    return res.json({
      ok: true,
      mensaje: "Datos recibidos correctamente y referencias guardadas. Sigue el flujo de validación.",
      ////referencias,
      ////...urls,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ mensaje: 'Error interno', detalle: err.message })
  }
}

exports.registrarIndependiente = async (req, res) => {
  try {
    // Parsear datos
    let referencias = JSON.parse(req.body.referencias || '[]')
    const files = req.files
    const idCre_SolicitudWeb = req.body.idCre_SolicitudWeb
    const idActividadEconomica = req.body.idActividadEconomica
    const IngresoPromedio = req.body.IngresoPromedio

    // Validar dirección
    let direccionPersona = null
    if (req.body.direccion) {
      direccionPersona =
        typeof req.body.direccion === 'string'
          ? JSON.parse(req.body.direccion)
          : req.body.direccion

      const validacionDireccion = validarDireccion(direccionPersona);
      if (!validacionDireccion.valido) {
        return res.status(400).json({ mensaje: validacionDireccion.mensaje });
      }
    }

    // Validaciones generales
    if (!Array.isArray(referencias) || referencias.length < 2)
      return res
        .status(400)
        .json({ mensaje: 'Debes enviar al menos dos referencias personales.' })

    if (!files?.cedulaFrente || !files?.cedulaDorso || !files?.fotoRostro)
      return res
        .status(400)
        .json({ mensaje: 'Debes enviar las fotos requeridas.' })

    for (const ref of referencias) {
      const validacionRef = validarReferencia(ref);
      if (!validacionRef.valido) {
        return res.status(400).json({ mensaje: validacionRef.mensaje });
      }
    }

    if (!idCre_SolicitudWeb)
      return res.status(400).json({ mensaje: 'Falta el idCre_SolicitudWeb.' })

    if (!idActividadEconomica || IngresoPromedio === undefined)
      return res
        .status(400)
        .json({ mensaje: 'Faltan idActividadEconomica o IngresoPromedio.' })

    // Validar independiente
    const repoGrande = AppDataSource.getRepository(WebSolicitudGrande)
    const solicitud = await repoGrande.findOne({
      where: { idCre_SolicitudWeb }
    })
    if (solicitud.idSituacionLaboral !== 2)
      return res
        .status(400)
        .json({ mensaje: 'Solo se permite registrar independientes.' })

    // Guardar dirección + datos económicos
    if (direccionPersona) {
      await guardarDireccionYDatos(
        repoGrande,
        idCre_SolicitudWeb,
        direccionPersona,
        {
          idActEconomica: idActividadEconomica,
          IngresosNegosio: IngresoPromedio
        }
      )
    }

    // Subir imágenes
    const urls = await subirImagenes(files)

    // Guardar referencias
    const repoRefs = AppDataSource.getRepository('CreReferenciasClientesWeb')
    await guardarReferencias(repoRefs, idCre_SolicitudWeb, referencias)

    // Actualizar fotos
    const repoSolicitud = AppDataSource.getRepository(Cre_SolicitudWeb)
    await actualizarFotos(repoSolicitud, repoGrande, idCre_SolicitudWeb, urls)

    return res.json({
      ok: true,
      mensaje: "Datos recibidos correctamente y referencias guardadas. Sigue el flujo de validación.",
     /// referencias,
     //// ...urls,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ mensaje: 'Error interno', detalle: err.message })
  }
}

exports.getProvincias = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Cre_Provincia)
    const provincias = await repo.find({
      select: { idProvincia: true, Nombre: true, Codigo: true }
    })
    res.json(provincias)
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: 'Error consultando provincias', detalle: err.message })
  }
}

// Consulta de cantones por provincia
exports.getCantones = async (req, res) => {
  const { idProvincia } = req.query
  try {
    const repo = AppDataSource.getRepository(Cre_Canton)
    let cantones
    if (idProvincia) {
      cantones = await repo.find({
        select: { idCanton: true, Nombre: true, Codigo: true },
        where: { idProvincia: Number(idProvincia) }
      })
    } else {
      cantones = await repo.find()
    }
    res.json(cantones)
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: 'Error consultando cantones', detalle: err.message })
  }
}

// Consulta de parroquias por cantón
exports.getParroquias = async (req, res) => {
  const { idCanton } = req.query
  try {
    const repo = AppDataSource.getRepository(Cre_Parroquia)
    let parroquias
    if (idCanton) {
      parroquias = await repo.find({
        select: { idParroquia: true, Nombre: true, Codigo: true },
        where: { idCanton: Number(idCanton) }
      })
    } else {
      parroquias = await repo.find()
    }
    res.json(parroquias)
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: 'Error consultando parroquias', detalle: err.message })
  }
}

// Consulta de barrios por parroquia
exports.getBarrios = async (req, res) => {
  const { idParroquia } = req.query
  try {
    const repo = AppDataSource.getRepository(Cre_Barrio)
    let barrios
    if (idParroquia) {
      barrios = await repo.find({
        select: { idBarrio: true, Nombre: true, Codigo: true },
        where: { idParroquia: Number(idParroquia) }
      })
    } else {
      barrios = await repo.find()
    }
    res.json(barrios)
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: 'Error consultando barrios', detalle: err.message })
  }
}

// Consulta de todos los parentescos
exports.getParentescos = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Parentesco)
    const parentescos = await repo.find()
    res.json(parentescos)
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: 'Error consultando parentescos', detalle: err.message })
  }
}

exports.getActividadesEconomicas = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(ActividadEconomica)
    const actividades = await repo.find({
      select: { idActEconomica: true, Nombre: true },
      where: { Tipo: 2 }
    })
    // Solo devolver Nombre e idActEconomica en la respuesta
    res.json(actividades.map(({ idActEconomica, Nombre }) => ({ idActEconomica, Nombre })))
  } catch (err) {
    res.status(500).json({
      mensaje: 'Error consultando actividades económicas',
      detalle: err.message
    })
  }
}

///endpoint para consultar el estado de la solicitud por cedula

exports.getEstadoSolicitudPorCedula = async (req, res) => {
  const { cedula } = req.query
  if (!cedula) {
    return res.status(400).json({ mensaje: 'Falta el parámetro cedula.' })
  }
  try {
    const repo = AppDataSource.getRepository(Cre_SolicitudWeb)
    // Busca el registro con la fecha más reciente para la cédula
    const solicitud = await repo.findOne({
      where: { Cedula: cedula },
      order: { Fecha: 'DESC' }
    })
    if (!solicitud) {
      return res
        .status(404)
        .json({ mensaje: 'No se encontró solicitud para esa cédula.' })
    }
    const estadosTextuales = {
      1: 'Pre-Aprobado',
      2: 'Aprobado',
      3: 'Anulado',
      4: 'Rechazado',
      5: 'No aplica',
      6: 'Facturado',
      7: 'Caducado'
    }
    const estado = solicitud.Estado
    let mensaje
    switch (estado) {
      case 1:
        mensaje = 'Tu solicitud está pre-aprobada. '
        break
      case 2:
        mensaje = '¡Felicidades! Tu solicitud fue aprobada.'
        break
      case 3:
        mensaje =
          'La solicitud fue anulada. Por favor, comunícate con soporte si tienes dudas.'
        break
      case 4:
        mensaje =
          'La solicitud fue rechazada. Puedes intentar nuevamente o consultar por otros productos.'
        break
      case 5:
        mensaje = 'No aplica para crédito directo en este momento.'
        break
      case 6:
        mensaje = 'La solicitud ya fue facturada.'
        break
      case 7:
        mensaje =
          'La solicitud está caducada. Por favor, inicia un nuevo proceso si lo deseas.'
        break
      default:
        mensaje = 'Estado desconocido.'
    }
    return res.json({
      // estado: estadosTextuales[estado] || estado,
      mensaje,
      // idCre_SolicitudWeb: solicitud.idCre_SolicitudWeb,
      Fecha: solicitud.Fecha,
      Cedula: solicitud.Cedula
    })
  } catch (err) {
    return res.status(500).json({
      mensaje: 'Error consultando estado de la solicitud',
      detalle: err.message
    })
  }
}
