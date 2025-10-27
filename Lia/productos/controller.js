/* eslint-disable camelcase */
const { AppDataSource } = require('../../ApiCobrador/api/config/database')

require('dotenv').config({ path: '../../.env' }) // Cargar las variables de entorno desde el archivo .env

exports.Productos_WEB_LHIA = async (req, res) => {
  try {
    const tasaAnual = await this.ObtenerTasaAnual()
    const numCuotas = 18
    const BaseUrl =
      process.env.MARKETPLACE_URL || 'https://ecommerce.appservices.com.ec/'
    const filtroTitulo = req.query.filtroTitulo
    const result = await AppDataSource.query(
      'EXEC dbo.ObtenerWEBProductosLhia @filtroTitulo = @0',
      [filtroTitulo]
    )
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron productos',
        data: null,
        totalRecords: 0
      })
    }
    const productosConURL = await Promise.all(
      result.map(async (p) => ({
        ...p,
        Cuotas: numCuotas,
        ValorCuota: await exports.CalcularValorCuota(
          p.Credito,
          numCuotas,
          tasaAnual
        ),
        URL: `${BaseUrl}producto/${encodeURIComponent(p.Titulo)}-${p.idItem}`
      }))
    )

    return res.status(200).json({
      status: 'success',
      message: 'Productos obtenidos correctamente',
      data: productosConURL,
      totalRecords: result.length
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Ofertas_WEB_LHIA = async (req, res) => {
  try {
    const tasaAnual = await this.ObtenerTasaAnual()
    const numCuotas = 18
    const filtroTitulo = req.query.filtroTitulo
    const BaseUrl =
      process.env.MARKETPLACE_URL || 'https://ecommerce.appservices.com.ec/'
    const result = await AppDataSource.query(
      'EXEC dbo.ObtenerWEBOfertasLhia @filtroTitulo = @0',
      [filtroTitulo]
    )
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron ofertas',
        data: null,
        totalRecords: 0
      })
    }
    const ofertasAgrupadasMap = {}

    for (const fila of result) {
      if (!ofertasAgrupadasMap[fila.idItem]) {
        ofertasAgrupadasMap[fila.idItem] = {
          idItem: fila.idItem,
          Titulo: fila.Titulo,
          Imagen: fila.Imagen,
          Tarjeta: fila.Tarjeta,
          Credito: fila.Credito,
          Cuotas: numCuotas,
          ValorCuota: await exports.CalcularValorCuota(
            fila.Credito,
            numCuotas,
            tasaAnual
          ),
          idWEB_Categorias: fila.idWEB_Categorias,
          URL: `${BaseUrl}productooferta/${encodeURIComponent(fila.Titulo)}-${fila.idItem}`,
          detalles: []
        }
      }

      ofertasAgrupadasMap[fila.idItem].detalles.push({
        idWEB_DetalleOfertas: fila.idWEB_DetalleOfertas,
        Producto: fila.Producto,
        ProductoImagen: fila.ProductoImagen
      })
    }

    const ofertasAgrupadas = Object.values(ofertasAgrupadasMap)

    return res.status(200).json({
      status: 'success',
      message: 'Productos obtenidos correctamente',
      data: ofertasAgrupadas,
      totalRecords: ofertasAgrupadas.length
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Baratazos_WEB_LHIA = async (req, res) => {
  // dbo.ObtenerWEBBaratazosLhia
  try {
    const filtroTitulo = req.query.filtroTitulo
    const BaseUrl =
      process.env.MARKETPLACE_URL || 'https://ecommerce.appservices.com.ec/'
    const result = await AppDataSource.query(
      'EXEC dbo.ObtenerWEBBaratazosLhia @filtroTitulo = @0',
      [filtroTitulo]
    )
    if (!result || result.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron baratazos',
        data: null,
        totalRecords: 0
      })
    }
    const baratazosAgrupadas = Object.values(
      result.reduce((acc, fila) => {
        if (!acc[fila.idItem]) {
          acc[fila.idItem] = {
            idItem: fila.idItem,
            Titulo: fila.Titulo,
            Imagen: fila.Imagen,
            Tarjeta: fila.Tarjeta,
            Credito: fila.Credito,
            Cuotas: fila.Cuotas,
            ValorCuota: fila.ValorCuota,
            idWEB_Categorias: fila.idWEB_Categorias,
            URL: `${BaseUrl}productobaratazo/${encodeURIComponent(fila.Titulo)}-${fila.idItem}`,
            detalles: []
          }
        }
        acc[fila.idItem].detalles.push({
          idWEB_DetalleOfertas: fila.idWEB_DetalleOfertas,
          Producto: fila.Producto,
          ProductoImagen: fila.ProductoImagen
        })
        return acc
      }, {})
    )
    return res.status(200).json({
      status: 'success',
      message: 'Productos obtenidos correctamente',
      data: baratazosAgrupadas,
      totalRecords: baratazosAgrupadas.length
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.CarritoAgregarDetalle = async (req, res) => {
  const API_URL =
    process.env.MARKETPLACE_API_URL ||
    'https://ecommerce.appservices.com.ec/api/v1/'
  try {
    const {
      idWEB_Carrito,
      idWEB_Categoria,
      idItem,
      cantidad = 1,
      UrlImagen,
      UrlItem
    } = req.body
    // Validación básica
    if (!idWEB_Categoria || !idItem) {
      return res.status(400).json({
        status: 'error',
        message: 'idWEB_Categoria y idItem son requeridos',
        data: null,
        totalRecords: 0
      })
    }
    // Extraer la ruta del URL (sin validación)
    const ItemUrl = /^https?:\/\//i.test(UrlItem || '')
      ? new URL(UrlItem).pathname
      : null
    const detalle = {
      idWEB_Carrito: idWEB_Carrito || null,
      idWEB_Categoria,
      idItem,
      cantidad,
      UrlImagen,
      UrlItem: ItemUrl,
      creadoEn: 'LHIA'
    }
    const response = await fetch(
      `${API_URL}carrito-compra/agregar-detalle-lhia`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalle)
      }
    )
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error API externa: ${text}`)
    }
    const data = await response.json()
    if (data.status !== 200) {
      return res.status(400).json({
        status: 'error',
        message: data.message,
        data: null,
        totalRecords: 0
      })
    }
    const carritoURL = `${API_URL}carrito-compra/${data.data.idWEB_Carrito}`
    return res.status(200).json({
      status: 'success',
      message: data.message,
      data: { URL: carritoURL, ...data.data },
      totalRecords: 1
    })
  } catch (error) {
    console.error('CarritoAgregarDetalle Error:', error)

    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.CarritoReducirDetalle = async (req, res) => {
  const API_URL =
    process.env.MARKETPLACE_API_URL ||
    'https://ecommerce.appservices.com.ec/api/v1/'
  try {
    const { idWEB_CarritoDetalle, cantidad = 1 } = req.body
    // Validación básica
    if (!idWEB_CarritoDetalle) {
      return res.status(400).json({
        status: 'error',
        message: 'idWEB_CarritoDetalle',
        data: null,
        totalRecords: 0
      })
    }
    const response = await fetch(
      `${API_URL}carrito-compra/reducir-detalle-lhia`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idWEB_CarritoDetalle, cantidad })
      }
    )
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error API externa: ${text}`)
    }
    const data = await response.json()
    if (data.status !== 200) {
      return res.status(400).json({
        status: 'error',
        message: data.message,
        data: null,
        totalRecords: 0
      })
    }
    const carritoURL = `${MARKETPLACE_URL}cargar-carrito/${idWEB_Carrito}`
    return res.status(200).json({
      status: 'success',
      message: data.message,
      data: { URL: carritoURL, ...data.data },
      totalRecords: 1
    })
  } catch (error) {
    console.error('CarritoReducirDetalle Error:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.CarritoObtenerCompleto = async (req, res) => {
  const API_URL =
    process.env.MARKETPLACE_API_URL ||
    'https://ecommerce.appservices.com.ec/api/v1/'
  const MARKETPLACE_URL =
    process.env.MARKETPLACE_URL || 'https://ecommerce.appservices.com.ec/'
  try {
    const { idWEB_Carrito } = req.params
    if (!idWEB_Carrito) {
      res.status(400).json({
        status: 'error',
        message: 'idWEB_Carrito es requerido',
        data: null,
        totalRecords: 0
      })
    }
    const response = await fetch(
      `${API_URL}carrito-compra/obtener-carrito-lhia/${idWEB_Carrito}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Error API externa: ${text}`)
    }
    const data = await response.json()
    if (data.status !== 200) {
      return res.status(400).json({
        status: 'error',
        message: data.message,
        data: null,
        totalRecords: 0
      })
    }
    const carritoURL = `${MARKETPLACE_URL}cargar-carrito/${idWEB_Carrito}`
    return res.status(200).json({
      status: 'success',
      message: data.message,
      data: { URL: carritoURL, ...data.data },
      totalRecords: data.totalRecords
    })
  } catch (error) {
    console.error('CarritoObtenerCompleto Error:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.CalculaCuotaInicial = (capital, cuotas, tasaAnual) => {
  const tasaMensualDecimal = tasaAnual / 12 / 100
  if (tasaMensualDecimal === 0) {
    return capital / cuotas
  }
  const numerador = tasaMensualDecimal
  const denominador = 1 - Math.pow(1 + tasaMensualDecimal, -cuotas)
  const valorCuotas = capital * (numerador / denominador)
  return Math.round(valorCuotas * 100) / 100
}

exports.ObtenerTasaAnual = async () => {
  const fechaActual = new Date()
  const idEntidadFinanciera = 1
  const tasaAnual = await AppDataSource.query(
    `Select TasaAnual
  	From Cre_Parametros
  	Where @0 Between CONVERT(Date, Desde) And CONVERT(Date, Hasta)
  	And idEntidadFinanciera = @1
  `,
    [fechaActual, idEntidadFinanciera]
  ).then((result) => {
    return result[0].TasaAnual
  })
  return tasaAnual
}

exports.CalcularValorCuota = async (capital, cuotas, tasaAnual) => {
  const cuotaSinPR = this.CalculaCuotaInicial(capital, cuotas, tasaAnual)
  const precioPointRespaldoSinIva = await AppDataSource.query(
    `EXEC Cre_CalcularPrecioPointRespaldo
          @valorCuota = @0,
          @numeroCuotas = @1`,
    [cuotaSinPR, cuotas]
  ).then((res) => res?.[0]?.Total ?? 0)
  const precioPointRespaldo = precioPointRespaldoSinIva * 1.15
  const MontoFinanciamiento = capital + precioPointRespaldo
  const cuotaConPR = this.CalculaCuotaInicial(
    MontoFinanciamiento,
    cuotas,
    tasaAnual
  )
  return cuotaConPR
}
