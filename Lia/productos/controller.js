/* eslint-disable camelcase */
const { AppDataSource } = require('../../ApiCobrador/api/config/database')
const { v4: uuidv4 } = require('uuid')

require('dotenv').config({ path: '../../.env' }) // Cargar las variables de entorno desde el archivo .env
// Función para generar la URL amigable

// Controlador
function formatUrl(Grupo, SubGrupo, nombreComercial, sku) {
  uuidv4()
  const formatString = (str) =>
    str
      .toLowerCase()
      .normalize('NFD') // Normaliza caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales excepto guiones
      .trim()
      .replace(/\s+/g, '-') // Reemplaza espacios con guiones

  const urlGrupo = formatString(Grupo)
  const urlSubGrupo = formatString(SubGrupo)
  const urlNombre = formatString(nombreComercial)

  return `${urlGrupo}-${urlSubGrupo}-${urlNombre}-${sku}`
}

// Controlador principal
exports.Baratazos_WEB_WP = async (req, res) => {
  try {
    const result = await AppDataSource.query('EXEC dbo.WEB_Baratazos_SP')

    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron baratazos',
        data: null,
        totalRecords: 0
      })
    }

    const marketplaceUrl =
      process.env.MARKETPLACE_URL || 'https://point.appservices.com.ec/' // URL base del marketplace

    const data = result.map((p) => {
      const {
        Codigo,
        Titulo,
        Descripcion,
        Imagen,
        PrecioAntes,
        PrecioPromocional,
        Grupo,
        SubGrupo,
        idWEB_Baratazos,
        idWEB_Grupos,
        Tipo
      } = p

      const Url =
        `${marketplaceUrl}productobaratazo/` +
        formatUrl(
          Grupo || '',
          SubGrupo || '',
          Titulo || '',
          idWEB_Baratazos || 0
        )

      return {
        Id: idWEB_Baratazos,
        Codigo,
        Titulo,
        Descripcion,
        PrecioAntes,
        Precio: PrecioPromocional,
        Imagen,
        Url,
        idWEB_Grupos,
        idWEB_Categorias: Tipo
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Baratazos obtenidos.',
      data,
      totalRecords: data.length
    })
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado:', err)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Ofertas_WEB_WP = async (req, res) => {
  try {
    const result = await AppDataSource.query('EXEC dbo.WEB_Ofertas_SP')

    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron baratazos',
        data: null,
        totalRecords: 0
      })
    }

    const marketplaceUrl =
      process.env.MARKETPLACE_URL || 'https://point.appservices.com.ec/' // URL base del marketplace

    const data = result.map((p) => {
      const {
        Titulo,
        Descripcion,
        Imagen,
        PrecioTarjeta,
        Grupo,
        SubGrupo,
        idWEB_Ofertas,
        idWEB_Grupos,
        Tipo
      } = p

      const Url =
        `${marketplaceUrl}productooferta/` +
        formatUrl(Grupo || '', SubGrupo || '', Titulo || '', idWEB_Ofertas || 0)

      return {
        Id: idWEB_Ofertas,
        Titulo,
        Descripcion,
        Precio: PrecioTarjeta,
        Imagen,
        Url,
        idWEB_Grupos,
        idWEB_Categorias: Tipo
      }
    })

    return res.status(200).json({
      status: 'success',
      message: 'Ofertas obtenidas.',
      data,
      totalRecords: data.length
    })
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado:', err)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.productosWEB_WP = async (req, res) => {
  try {
    const result = await AppDataSource.query('EXEC dbo.WEB_Productos_SP_Lia')
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron baratazos',
        data: null,
        totalRecords: 0
      })
    }
    const marketplaceUrl =
      process.env.MARKETPLACE_URL || 'https://point.appservices.com.ec/' // URL base del marketplace
    const data = result.map((p) => {
      const {
        Codigo,
        Titulo,
        Descripcion,
        Imagen,
        Tarjeta,
        Grupo,
        Subgrupo,
        sku,
        idWEB_Grupos,
        idWEB_Categorias
      } = p
      const Url =
        `${marketplaceUrl}producto/` +
        formatUrl(Grupo || '', Subgrupo || '', Titulo || '', sku || 0)
      return {
        Id: sku,
        Codigo,
        Titulo,
        Descripcion,
        Precio: Tarjeta,
        Imagen,
        Url,
        idWEB_Grupos,
        idWEB_Categorias
      }
    })
    return res.status(200).json({
      status: 'success',
      message: 'Productos obtenidos.',
      data,
      totalRecords: data.length
    })
  } catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado:', err)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.crearCarrito = async (req, res) => {
  let {
    KeyCarrito,
    MetodoPago = 1,
    carritoDetalle
  } = req.body
  if (!carritoDetalle ||
    !carritoDetalle.idWEB_Categorias || carritoDetalle.idWEB_Categorias === 0 ||
    !carritoDetalle.Titulo || carritoDetalle.Titulo === '' ||
    !carritoDetalle.Id || carritoDetalle.Id === 0 ||
    !carritoDetalle.Precio || carritoDetalle.Precio === 0 ||
    !carritoDetalle.Imagen || carritoDetalle.Imagen === '' ||
    !carritoDetalle.idWEB_Grupos || carritoDetalle.idWEB_Grupos === 0) {
    return res.status(400).json({ error: 'Los detalles del carrito son inválidos o faltan detalles.' })
  }
  console.log('carritoDetalle', carritoDetalle)
  let idWEB_Carrito
  try {
    const findKeyCarrito = await AppDataSource.query(
      'select wc.idWEB_Carrito, wc.KeyCarrito from WEB_Carrito wc where wc.KeyCarrito = @0 and wc.Estado = 1',
      [KeyCarrito]
    )
    if (!findKeyCarrito[0]) {
      KeyCarrito = uuidv4() // se genera una nueva keyCarrito
      const newCarrito = {
        KeyCarrito,
        MetodoPago: 1
      }
      const createCarrito = await AppDataSource.query(
        'INSERT INTO WEB_Carrito (KeyCarrito, MetodoPago) VALUES (@0, @1) SELECT SCOPE_IDENTITY() as idWEB_Carrito',
        [newCarrito.KeyCarrito, newCarrito.MetodoPago]
      )
      idWEB_Carrito = createCarrito[0].idWEB_Carrito
    } else {
      idWEB_Carrito = findKeyCarrito[0].idWEB_Carrito
      KeyCarrito = findKeyCarrito[0].KeyCarrito
    }
    // se busca si hay un detalle ya existente de el carrito
    const detalleExistente = await AppDataSource.query(
      'select * from WEB_CarritoDetalle where idWEB_Categorias = @0 and Id = @1 and idWEB_Grupo = @2 and idWEB_Carrito = @3',
      [carritoDetalle.idWEB_Categorias, carritoDetalle.Id, carritoDetalle.idWEB_Grupos, idWEB_Carrito]
    )
    /*
      UPDATE WEB_CarritoDetalle
      SET Cantidad = Cantidad + 1
      WHERE idWEB_CarritoDetalle = 1005;
    */
    if (detalleExistente && detalleExistente.length > 0) {
      const updateDetalle = await AppDataSource.query(
        'update WEB_CarritoDetalle set Cantidad = Cantidad + @0 where idWEB_CarritoDetalle = @1 SELECT SCOPE_IDENTITY() as idWEB_CarritoDetalle',
        [1, detalleExistente[0].idWEB_CarritoDetalle]
      )
      // TODO: Manejar que valide que el idWEB_CarritoDetalle se haya actualizado, si no se actualiza se devuelve un error
      carritoDetalle.idWEB_CarritoDetalle = updateDetalle[0].idWEB_CarritoDetalle
    } else {
      /*
      carritoDetalle es de la forma:
      {
            "Id": 1,
            "Titulo": "Tinta para impresora epson l200/black",
            "Precio": 11.5,
            "Imagen": "https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/SUMI-EPSO-T664120.jpg",
            "idWEB_Grupos": 3,
            "idWEB_Categorias": 747
        },
      */
      const newDetalle = {
        idWEB_CarritoDetalle: 0,
        idWEB_Categorias: carritoDetalle.idWEB_Categorias,
        Nombre: carritoDetalle.Titulo,
        Id: carritoDetalle.Id,
        idWEB_Carrito,
        KeyCarrito,
        Cantidad: 1,
        MetodoPago,
        Cuotas: 0,
        ValorCuota: '0.00',
        PriceCard: carritoDetalle.Precio,
        KeyItemCarrito: uuidv4(),
        Imagen: carritoDetalle.Imagen,
        idWEB_Clientes: 0,
        carritoDetalleSelIntangibleDto: 0,
        idWEB_Grupo: carritoDetalle.idWEB_Grupos,
        PrecioCreditoDirecto: 0
      }
      const createDetalle = await AppDataSource.query(
        `INSERT INTO WEB_CarritoDetalle 
        (idWEB_Categorias, Nombre, Id, idWEB_Carrito, KeyCarrito, Cantidad, MetodoPago, Cuotas, ValorCuota, PriceCard, KeyItemCarrito, Imagen, idWEB_Grupo)
        VALUES (@0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10, @11, @12)
        SELECT SCOPE_IDENTITY() as idWEB_CarritoDetalle`,
        [
          newDetalle.idWEB_Categorias,
          newDetalle.Nombre,
          newDetalle.Id,
          newDetalle.idWEB_Carrito,
          newDetalle.KeyCarrito,
          newDetalle.Cantidad,
          newDetalle.MetodoPago,
          newDetalle.Cuotas,
          newDetalle.ValorCuota,
          newDetalle.PriceCard,
          newDetalle.KeyItemCarrito,
          newDetalle.Imagen,
          newDetalle.idWEB_Grupo
        ]
      )
      carritoDetalle.idWEB_CarritoDetalle = createDetalle[0].idWEB_CarritoDetalle
    }
    const marketplaceUrl =
      process.env.MARKETPLACE_URL || 'https://point.appservices.com.ec/' // URL base del marketplace
    const finalCarrito = {
      KeyCarrito,
      MetodoPago,
      detalle: [],
      UrlCarrito: `${marketplaceUrl}cargar-carrito/${KeyCarrito}`
    }
    const finalDetalle = await AppDataSource.query(
      'select * from WEB_CarritoDetalle where idWEB_Carrito = @0',
      [idWEB_Carrito]
    )
    finalCarrito.detalle = finalDetalle
    return res.status(200).json({
      status: 'success',
      message: 'Carrito creado correctamente',
      data: finalCarrito,
      totalRecords: 1
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}
