const { AppDataSource } = require('../../ApiCobrador/api/config/database')
require('dotenv').config({ path: '../../.env' })
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const pdf = require('html-pdf')

exports.Compras_Por_Ruc = async (req, res) => {
  const { ruc } = req.body
  if (!ruc) {
    return res.status(400).json({
      status: 'error',
      message: 'Cédula o Ruc es requerido'
    })
  }
  try {
    const compras = await AppDataSource.query(
      `
      exec dbo.ObtenerComprasPorRuc @0;
      `,
      [ruc]
    )
    if (!compras || compras.length === 0) {
      throw new Error('404')
    }
    return res.status(200).json({
      status: 'success',
      message: 'Compras obtenidas correctamente',
      data: compras,
      totalRecords: compras.length
    })
  } catch (error) {
    console.log(error)
    if (error.message === '404') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron compras',
        data: null,
        totalRecords: 0
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener las compras',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Compra_Por_idCompra = async (req, res) => {
  const { idCompra, Factura, Fecha } = req.body
  if (!idCompra || !Factura || !Fecha) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos los campos idCompra, Factura y Fecha son requeridos'
    })
  }
  try {
    const compra = await AppDataSource.query(
      `
      exec dbo.ObtenerEstadoCompraPorId @0;
      `,
      [idCompra]
    )
    if (!compra || compra.length === 0) {
      throw new Error('404')
    }
    const hoy = new Date()

    // Encontrar la primera cuota vencida (no cancelada)
    const cuotaVencida = compra.find((c) => {
      const fechaVence = new Date(c.Vence)
      return c.Estado !== 2 && fechaVence < hoy
    })

    let diasMora = 0
    if (cuotaVencida) {
      const fechaVence = new Date(cuotaVencida.Vence)
      const diffMs = hoy.getTime() - fechaVence.getTime()
      diasMora = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    }

    const numCuotas = compra.length
    const cuotasCanceladas = compra.filter((c) => c.Estado === 2).length
    const cuotasVencidas = compra.filter((c) => {
      const fechaVence = new Date(c.Vence)
      return c.Estado !== 2 && fechaVence < hoy
    }).length
    const cuotasAbonadas = compra.filter((c) => c.Estado === 3).length
    const cuotasPendientes = numCuotas - cuotasCanceladas - cuotasVencidas
    const saldoPendiente = compra
      .reduce((acc, c) => acc + (c.Saldo || 0), 0)
      .toFixed(2)
    const fechaEmision = new Date().toLocaleDateString()

    const logoPath = path.join(__dirname, './image.png')
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' })

    const html = await ejs.renderFile(
      path.join(__dirname, './templates/Compra.ejs'),
      {
        factura: Factura,
        items: compra,
        numCuotas,
        cuotasCanceladas,
        cuotasAbonadas,
        cuotasPendientes,
        cuotasVencidas,
        saldoPendiente,
        fechaCompra: Fecha,
        fechaEmision,
        logoBase64,
        diasMora
      }
    )

    const options = { format: 'A4' }

    // Crear y enviar PDF
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generando PDF:', err)
        return res.status(500).send('Error generando PDF')
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=estado-compra.pdf',
        'Content-Length': buffer.length
      })

      res.send(buffer)
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener la compra',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Compra_Por_Ruc_IdCompra = async (req, res) => {
  try {
    const { ruc, idCompra } = req.body
    if (!ruc || !idCompra) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos ruc y idCompra son requeridos'
      })
    }
    const compras = await AppDataSource.query(
      `
      exec dbo.ObtenerComprasPorRuc @0;
      `,
      [ruc]
    )
    if (!compras || compras.length === 0) {
      throw new Error('404')
    }
    const matchCompra = compras.find((c) => c.idCompra === idCompra)
    if (!matchCompra) {
      throw new Error('404')
    }
    const Factura = matchCompra.Factura
    const Fecha = new Date(matchCompra.FechaCompra).toISOString().split('T')[0]
    const compra = await AppDataSource.query(
      `
      exec dbo.ObtenerEstadoCompraPorId @0;
      `,
      [idCompra]
    )
    if (!compra || compra.length === 0) {
      throw new Error('404')
    }
    const hoy = new Date()

    // Encontrar la primera cuota vencida (no cancelada)
    const cuotaVencida = compra.find((c) => {
      const fechaVence = new Date(c.Vence)
      return c.Estado !== 2 && fechaVence < hoy
    })

    let diasMora = 0
    if (cuotaVencida) {
      const fechaVence = new Date(cuotaVencida.Vence)
      const diffMs = hoy.getTime() - fechaVence.getTime()
      diasMora = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    }
    const saldoVencido = matchCompra.SaldoVencido
    const numCuotas = compra.length
    const cuotasCanceladas = compra.filter((c) => c.Estado === 2).length
    const cuotasVencidas = compra.filter((c) => {
      const fechaVence = new Date(c.Vence)
      return c.Estado !== 2 && fechaVence < hoy
    }).length
    const cuotasAbonadas = compra.filter((c) => c.Estado === 3).length
    const cuotasPendientes = numCuotas - cuotasCanceladas - cuotasVencidas
    const saldoPendiente = Number(
      compra.reduce((acc, c) => acc + (c.Saldo || 0), 0).toFixed(2)
    )

    const resultSet = {
      Factura: Factura,
      FechaCompra: Fecha,
      NumeroCuotas: numCuotas,
      CuotasCanceladas: cuotasCanceladas,
      CuotasAbonadas: cuotasAbonadas,
      CuotasPendientes: cuotasPendientes,
      CuotasVencidas: cuotasVencidas,
      DiasMora: diasMora,
      SaldoVencido: saldoVencido,
      SaldoPendiente: saldoPendiente,
      TablaAmortizacion: compra
    }

    return res.status(200).json({
      status: 'success',
      message: 'Compra obtenida correctamente',
      data: resultSet,
      totalRecords: compra.length
    })
  } catch (error) {
    console.log(error)
    if (error.message === '404') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron compras',
        data: null,
        totalRecords: 0
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener la compra',
      data: null,
      totalRecords: 0
    })
  }
}

exports.Factura_Por_idCompra = async (req, res) => {
  const { idCompra } = req.body

  if (!idCompra) {
    return res.status(400).json({
      status: 'error',
      message: 'idCompra es requerido'
    })
  }

  try {
    // Ejecutar el procedimiento almacenado
    const resultado = await AppDataSource.query(`exec dbo.FC_Electronica @0;`, [
      idCompra
    ])

    if (!resultado || resultado.length === 0) {
      throw new Error('404')
    }

    // El primer registro contiene la info general (se repite en todos)
    const primerRegistro = resultado[0]
    let telfEmpresa = ''
    let telfCliente = ''

    if (Array.isArray(primerRegistro.Telefono)) {
      telfEmpresa = primerRegistro.Telefono[0] || ''
      telfCliente = primerRegistro.Telefono[1] || ''
    } else if (typeof primerRegistro.Telefono === 'string') {
      const telefonos = primerRegistro.Telefono.split(',')
      telfEmpresa = telefonos[0] ? telefonos[0].trim() : ''
      telfCliente = telefonos[1] ? telefonos[1].trim() : ''
    }

    // Función auxiliar para convertir número a letras (básica)
    const numeroALetras = (num) => {
      const unidades = [
        '',
        'UN',
        'DOS',
        'TRES',
        'CUATRO',
        'CINCO',
        'SEIS',
        'SIETE',
        'OCHO',
        'NUEVE'
      ]
      const decenas = [
        '',
        '',
        'VEINTE',
        'TREINTA',
        'CUARENTA',
        'CINCUENTA',
        'SESENTA',
        'SETENTA',
        'OCHENTA',
        'NOVENTA'
      ]
      const centenas = [
        '',
        'CIENTO',
        'DOSCIENTOS',
        'TRESCIENTOS',
        'CUATROCIENTOS',
        'QUINIENTOS',
        'SEISCIENTOS',
        'SETECIENTOS',
        'OCHOCIENTOS',
        'NOVECIENTOS'
      ]
      const especiales = [
        'DIEZ',
        'ONCE',
        'DOCE',
        'TRECE',
        'CATORCE',
        'QUINCE',
        'DIECISEIS',
        'DIECISIETE',
        'DIECIOCHO',
        'DIECINUEVE'
      ]

      const parteEntera = Math.floor(num)
      const parteDecimal = Math.round((num - parteEntera) * 100)

      let resultado = ''

      if (parteEntera === 0) {
        resultado = 'CERO'
      } else if (parteEntera < 10) {
        resultado = unidades[parteEntera]
      } else if (parteEntera < 20) {
        resultado = especiales[parteEntera - 10]
      } else if (parteEntera < 100) {
        const dec = Math.floor(parteEntera / 10)
        const uni = parteEntera % 10
        resultado = decenas[dec] + (uni > 0 ? ' Y ' + unidades[uni] : '')
      } else if (parteEntera < 1000) {
        const cen = Math.floor(parteEntera / 100)
        const resto = parteEntera % 100
        resultado = parteEntera === 100 ? 'CIEN' : centenas[cen]
        if (resto > 0) {
          resultado += ' ' + numeroALetras(resto).split(' CON ')[0]
        }
      } else if (parteEntera < 1000000) {
        const miles = Math.floor(parteEntera / 1000)
        const resto = parteEntera % 1000
        resultado =
          miles === 1 ? 'MIL' : numeroALetras(miles).split(' CON ')[0] + ' MIL'
        if (resto > 0) {
          resultado += ' ' + numeroALetras(resto).split(' CON ')[0]
        }
      } else {
        const millones = Math.floor(parteEntera / 1000000)
        const resto = parteEntera % 1000000
        resultado =
          millones === 1
            ? 'UN MILLON'
            : numeroALetras(millones).split(' CON ')[0] + ' MILLONES'
        if (resto > 0) {
          resultado += ' ' + numeroALetras(resto).split(' CON ')[0]
        }
      }

      return (
        resultado.trim() +
        ' CON ' +
        parteDecimal.toString().padStart(2, '0') +
        '/100'
      )
    }

    // Preparar datos de la empresa
    const datosEmpresa = {
      RucEmpresa: primerRegistro.RucEmpresa,
      RazonSocial: 'SUPERMERCADO DE COMPUTADORAS<br>COMPUBUSSINES CIA LTDA',
      NombreComercial: 'POINT TECHNOLOGY CIA LTDA',
      DirEmpresa: primerRegistro.DirEmpresa,
      Telefono: telfEmpresa,
      Website: 'www.point.com.ec',
      DirSucursal: primerRegistro.DirSucursal,
      NResolucion: primerRegistro.NResolucion || '636 29/12/2005',
      ObligadoContabilidad: 'SI',
      tAmbiente: primerRegistro.tAmbiente || 'PRODUCCION'
    }

    // Preparar datos de la factura
    const factura = {
      Numero: primerRegistro.Numero,
      Fecha: primerRegistro.FechaDocEmi.toString(),
      TipoEmision: 'NORMAL',
      NombreArchivoSRI: primerRegistro.NombreArchivoSRI,
      FechaEnviaSRI: new Date(primerRegistro.FechaEnviaSRI).toLocaleString(
        'es-EC'
      ),
      ClaveAcceso: primerRegistro.serie,
      BodNombre: primerRegistro.BodNombre
    }

    // Preparar datos del cliente
    const cliente = {
      Nombre: primerRegistro.Nombre,
      Ruc: primerRegistro.Ruc,
      Direccion: primerRegistro.Direccion,
      Telefono: telfCliente,
      Email: primerRegistro.Email
    }

    // Preparar productos (cada registro es un producto)
    const productos = resultado.map((item) => ({
      Codigo: item.Codigo,
      Cantidad: item.Cantidad,
      Articulo: item.Articulo,
      Precio: item.Precio,
      DescuentoArt: item.DescuentoArt,
      Subtotal: item.Subtotal
    }))

    // Preparar totales
    const totales = {
      SubTotExent: primerRegistro.SubTotExent,
      Dscto0: primerRegistro.Dscto0,
      SubTotIva: primerRegistro.SubTotIva,
      Dscto: primerRegistro.Dscto,
      BaseImponible: primerRegistro.BaseImponible,
      Ice: 0,
      Iva: primerRegistro.Iva,
      Total: primerRegistro.Total,
      Impuesto: primerRegistro.Impuesto || 15
    }

    // Preparar forma de pago
    const formaPago = {
      nombre:
        primerRegistro.FormaPago || 'SIN UTILIZACION DEL SISTEMA FINANCIERO',
      valor: primerRegistro.Total,
      valorLetras: numeroALetras(primerRegistro.Total),
      tiempo: primerRegistro.Plazo || '18', // Ajusta según tu lógica
      plazo: 'MESES'
    }

    // Preparar seriales (si existen, concatenar todos los seriales únicos)
    const seriales = resultado
      .filter((item) => item.Serial)
      .map((item) => item.Serial)
      .join(', ')

    // Cargar logo
    const logoPath = path.join(__dirname, './image.png')
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' })

    // Renderizar HTML
    const html = await ejs.renderFile(
      path.join(__dirname, './templates/Factura.ejs'),
      {
        datosEmpresa,
        factura,
        cliente,
        productos,
        totales,
        formaPago,
        seriales,
        logoBase64
      }
    )

    // En tu controlador, cambia el objeto options:
    const options = {
      format: 'A4',
      border: '10mm',
      footer: {
        height: '10mm',
        contents: {
          default:
            '<div style="text-align: center; font-family: Arial; font-size: 8px; color: #333;">Página {{page}} de {{pages}}</div>'
        }
      }
    }

    // Crear y enviar PDF
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generando PDF:', err)
        return res.status(500).send('Error generando PDF')
      }

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=factura-${primerRegistro.Numero}.pdf`,
        'Content-Length': buffer.length
      })

      res.send(buffer)
    })
  } catch (error) {
    console.log(error)
    if (error.message === '404') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontró la factura'
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener la factura'
    })
  }
}
