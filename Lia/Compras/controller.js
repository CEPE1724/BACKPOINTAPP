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
      Select c.idCompra, c.SerieFactura + ' ' + c.Numero As Factura, c.Fecha, c.Total
      From Compra c 
        Inner Join Cre_TablaDeAmortizacion ta On ta.idCompra = c.idCompra
      Where c.idTipoFactura = 1
        And c.Borrar = 0
        And c.Estado = 10
        And c.idFormaPago = 9
        And c.Ruc = @0
      Group By c.idCompra, c.SerieFactura, c.Numero, c.Fecha, c.Total
      Having SUM(Capital - ABCapital) > 0;
      `, [ruc]
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
      SELECT 
      NumeroCuota,
      Inicia,
      Vence,
      FechaCancelacion,
      ValorCuota,
      Interes,
      Capital,
      ABCapital,
      ABInteres,
      Abono,
      Saldo,
      Estado,
      CASE Estado 
        WHEN 2 THEN 'CANCELADO'
        WHEN 1 THEN 'EN MORA'
        WHEN 0 THEN 'PENDIENTE'
        WHEN 3 THEN 'ABONADO'
        ELSE 'DESCONOCIDO'
      END AS EstadoDescripcion
      FROM Cre_TablaDeAmortizacion
      WHERE idCompra = @0
      ORDER BY NumeroCuota;
      `, [idCompra]
    )
    if (!compra || compra.length === 0) {
      throw new Error('404')
    }
    const numCuotas = compra.length
    const cuotasCanceladas = compra.filter(c => c.Estado === 2).length
    const cuotasVencidas = compra.filter(c => c.Estado === 1).length
    const cuotasAbonadas = compra.filter(c => c.Estado === 3).length
    const cuotasPendientes = numCuotas - cuotasCanceladas - cuotasVencidas
    const saldoPendiente = compra.reduce((acc, c) => acc + (c.Saldo || 0), 0).toFixed(2)
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
        logoBase64
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
