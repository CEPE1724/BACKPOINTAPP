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
    // 1. Consultar primero las compras
    const compras = await AppDataSource.query(
      `exec dbo.ObtenerComprasPorRuc @0;`,
      [ruc]
    )

    // Validar si no hay compras para retornar temprano y ahorrar memoria/procesamiento
    if (!compras || compras.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron compras',
        data: [],
        totalRecords: 0
      })
    }

    // 2. Solo si hay compras, consultamos las referencias
    const referencias = await AppDataSource.query(
      `exec dbo.ConsultarReferenciasPorCedula @0;`,
      [ruc]
    )

    // 3. Inyectar las referencias en cada objeto de compra
    const dataConReferencias = compras.map((compra) => ({
      ...compra,
      referencias: referencias || []
    }))

    return res.status(200).json({
      status: 'success',
      message: 'Compras y referencias obtenidas correctamente',
      data: dataConReferencias,
      totalRecords: dataConReferencias.length
    })
  } catch (error) {
    console.error('Error en Compras_Por_Ruc:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener los datos',
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

exports.ReporteRecibosCobro = async (req, res) => {
  const { idCompra } = req.body

  if (!idCompra) {
    return res
      .status(400)
      .json({ status: 'error', message: 'idCompra es requerido' })
  }

  try {
    // 1. Primera consulta: Anticipos
    const resultado = await AppDataSource.query(
      `exec dbo.ReporteHistorialAnticipos @0;`,
      [idCompra]
    )

    // Si no hay anticipos, lanzamos el error 404 de inmediato y no consultamos bancos
    if (!resultado || resultado.length === 0) {
      throw new Error('404')
    }

    // 2. Segunda consulta: Bancos (Solo se ejecuta si hay anticipos)
    const listaBancosRaw = await AppDataSource.query(
      'Exec ListaCuentasDepositos'
    )

    // 3. Agrupar los datos por idAnticipo
    const anticiposAgrupados = resultado.reduce((acc, curr) => {
      const id = curr.idAnticipo
      if (!acc[id]) {
        acc[id] = {
          cabecera: {
            idAnticipo: curr.idAnticipo,
            Secuencial: curr.Secuencial,
            Fecha: new Date(curr.Fecha).toLocaleDateString('es-EC'),
            Nombre: curr.Nombre,
            Ruc: curr.Ruc,
            Direccion: curr.Direccion,
            Telefono: curr.Telefono,
            TotalDescGestion: 0,
            TotalDescMora: 0,
            TotalGeneral: 0
          },
          detalles: []
        }
      }
      acc[id].detalles.push({
        Cuota: curr.Cuota,
        Descripcion: curr.Concepto,
        Valor: curr.ValorDetalle,
        GestionCobranza: curr.GestionCobranza,
        IntMora: curr.InteresMora,
        DescDif: curr.DescDiferimiento,
        Subtotal: curr.Subtotal
      })
      acc[id].cabecera.TotalDescGestion += parseFloat(curr.DescGestion || 0)
      acc[id].cabecera.TotalDescMora += parseFloat(curr.DesMora || 0)
      acc[id].cabecera.TotalGeneral += parseFloat(curr.Subtotal || 0)
      return acc
    }, {})

    // 4. Mapear bancos específicos para evitar lógica en el EJS
    const buscarEnRaw = (nombre) => {
      const b = listaBancosRaw.find((x) =>
        x.Descripcion.toUpperCase().includes(nombre.toUpperCase())
      )
      return b ? b.Descripcion : `${nombre} (Cuenta no disponible)`
    }

    const bancosFinales = {
      pichincha: buscarEnRaw('PICHINCHA'),
      guayaquil: buscarEnRaw('GUAYAQUIL'),
      produbanco: buscarEnRaw('PRODUBANCO'),
      pacifico: buscarEnRaw('PACIFICO')
    }

    // 5. Cargar Logo
    const logoPath = path.join(__dirname, './image.png')
    let logoBase64 = ''
    if (fs.existsSync(logoPath)) {
      logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' })
    }

    // 6. Renderizar HTML con los datos preparados
    const html = await ejs.renderFile(
      path.join(__dirname, './templates/Recibos.ejs'),
      {
        listaAnticipos: Object.values(anticiposAgrupados),
        logoBase64,
        bancos: bancosFinales
      }
    )

    const options = {
      format: 'A4',
      border: { top: '10mm', right: '15mm', bottom: '10mm', left: '15mm' },
      footer: {
        height: '10mm',
        contents: {
          default:
            '<div style="text-align: center; font-size: 8px;">Página {{page}} de {{pages}}</div>'
        }
      }
    }

    // 7. Generar y enviar PDF
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error('Error generando PDF:', err)
        return res.status(500).send('Error generando PDF')
      }
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Recibos-Compra-${idCompra}.pdf`,
        'Content-Length': buffer.length
      })
      res.send(buffer)
    })
  } catch (error) {
    console.error('Error en ReporteRecibosCobro:', error)
    const code = error.message === '404' ? 404 : 500
    const msg =
      error.message === '404'
        ? 'No se encontraron anticipos'
        : 'Error al generar el reporte'
    res.status(code).json({ status: 'error', message: msg })
  }
}
