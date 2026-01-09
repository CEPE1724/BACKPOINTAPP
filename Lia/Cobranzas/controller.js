const { AppDataSource } = require('../../ApiCobrador/api/config/database')
require('dotenv').config({ path: '../../.env' })
const { Storage } = require('@google-cloud/storage')
const path = require('path')
const fs = require('fs')
const credentialsPath = path.join(
  __dirname,
  '../../ApiCobrador/api/key/credentials.json'
)
const credentials = JSON.parse(fs.readFileSync(credentialsPath))

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n')
  }
})
const bucketName = 'sparta_bucket'

exports.getBancos = async (req, res) => {
  try {
    const bancos = await AppDataSource.query('Exec ListaCuentasDepositos')
    if (!bancos || bancos.length === 0) {
      throw new Error('404')
    }
    return res.status(200).json({
      status: 'success',
      message: 'Bancos obtenidos correctamente',
      data: bancos,
      totalRecords: bancos.length
    })
  } catch (error) {
    if (error.message === '404') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron bancos',
        data: null,
        totalRecords: 0
      })
    }
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}

exports.subirDeposito = async (req, res) => {
  const {
    Fecha,
    BancoId,
    Abono,
    IdCompra,
    NumeroDeposito,
    Cedula,
    Nota,
    Origen
  } = req.body
  const file = req.file
  const notaFinal = Nota ?? ''

  try {
    // 1. Validaciones de presencia
    if (
      !Fecha ||
      !BancoId ||
      !Abono ||
      !IdCompra ||
      !NumeroDeposito ||
      !Cedula
    ) {
      throw new Error('400-body')
    }
    if (!file) {
      throw new Error('400-file')
    }

    // 2. VALIDACIÓN: Obtener compras del cliente y verificar pertenencia
    const comprasCliente = await AppDataSource.query(
      'exec dbo.ObtenerComprasPorRuc @0;',
      [Cedula]
    )

    if (!comprasCliente || comprasCliente.length === 0) {
      throw new Error('404-idCliente') // El cliente no tiene compras registradas
    }

    // Buscamos si el IdCompra enviado está en su lista de compras
    const compraValida = comprasCliente.find(
      (c) => String(c.idCompra) === String(IdCompra)
    )

    if (!compraValida) {
      throw new Error('403-invalid-owner') // La compra existe pero no pertenece a este RUC
    }

    // Extraemos el idCliente del resultado del procedimiento
    const idCliente = compraValida.idCliente

    // 3. Proceso de subida a Google Cloud Storage
    const fileBuffer = file.buffer
    const extension = path.extname(file.originalname)
    const rawBaseName = path.basename(file.originalname, extension)
    const baseName = rawBaseName.replace(/\s+/g, '_')
    const nombreArchivo = `${baseName}-${Date.now()}${extension}`
    const rutaArchivo = `Despositos/POINT/${Cedula}/${nombreArchivo}`

    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(rutaArchivo)

    // Usamos una promesa para manejar el stream de subida
    const publicUrl = await new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        metadata: { contentType: file.mimetype }
      })
      blobStream.on('error', (err) => reject(err))
      blobStream.on('finish', () => {
        resolve(`https://storage.googleapis.com/${bucketName}/${rutaArchivo}`)
      })
      blobStream.end(fileBuffer)
    })

    // 4. Ejecución del SP para grabar el depósito
    const resultGraba = await AppDataSource.query(
      'exec dbo.GrabaDepositosPendientesLIA @0, @1, @2, @3, @4, @5, @6, @7, @8, @9;',
      [
        Fecha,
        idCliente,
        BancoId,
        Abono,
        IdCompra,
        NumeroDeposito,
        Cedula,
        publicUrl,
        notaFinal,
        Origen ?? null
      ]
    )

    const voucher = resultGraba[0]?.Voucher
    if (!voucher) {
      throw new Error('400-insert')
    }

    return res.status(200).json({
      status: 'success',
      message: 'Deposito subido correctamente, #Voucher: ' + voucher,
      data: null,
      totalRecords: 0
    })
  } catch (error) {
    console.error('Error en subirDeposito:', error.message)

    if (error.message === '400-body' || error.message === '400-file') {
      return res.status(400).json({
        status: 'error',
        message:
          'Los campos Fecha, BancoId, Abono, IdCompra, NumeroDeposito, Cédula y el comprobante son requeridos.',
        data: null,
        totalRecords: 0
      })
    }

    // Manejo de la nueva validación
    if (error.message === '403-invalid-owner') {
      return res.status(403).json({
        status: 'error',
        message: 'La compra no pertenece al cliente especificado.',
        data: null,
        totalRecords: 0
      })
    }

    // Mantenemos tus validaciones originales
    if (error.message === '400-body') {
      return res.status(400).json({
        status: 'error',
        message:
          'Los campos Fecha, BancoId, Abono, IdCompra, NumeroDeposito, Cedula son requeridos',
        data: null,
        totalRecords: 0
      })
    }

    if (error.message === '404-idCliente') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron compras asociadas a esta identificación',
        data: null,
        totalRecords: 0
      })
    }

    // ... resto de tus validaciones (400-file, 400-insert, 409 duplicado, 500)
    return res.status(500).json({
      status: 'error',
      message: error.message.includes('ya existe')
        ? 'El número de depósito ya ha sido registrado'
        : 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}
