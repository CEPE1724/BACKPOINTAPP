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
      statatus: 'error',
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
    const idCliente = (
      await AppDataSource.query(
        'select top 1 idCliente from dbo.Compra where idCompra = @0',
        [IdCompra]
      )
    )[0].idCliente
    if (!idCliente) {
      throw new Error('404-idCliente')
    }
    const fileBuffer = file.buffer
    const extension = path.extname(file.originalname)
    const rawBaseName = path.basename(file.originalname, extension)
    const baseName = rawBaseName.replace(/\s+/g, '_')
    const nombreArchivo = `${baseName}-${Date.now()}${extension}`
    const rutaArchivo = `Despositos/POINT/${Cedula}/${nombreArchivo}`
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(rutaArchivo)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
    blobStream.on('error', (err) => {
      console.error('Error al subir archivo:', err)
      res.status(500).json({ error: 'Error al subir archivo' })
    })
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${rutaArchivo}`
    blobStream.end(fileBuffer)

    const insert = (
      await AppDataSource.query(
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
    )[0].Voucher
    if (!insert) {
      throw new Error('400-insert')
    }
    return res.status(200).json({
      status: 'success',
      message: 'Deposito subido correctamente, #Voucher: ' + insert,
      data: null,
      totalRecords: 0
    })
  } catch (error) {
    console.log(error)
    if (error.message === '400-body') {
      return res.status(400).json({
        status: 'error',
        message:
          'Los campos Fecha, BancoId, Abono, IdCompra, NumeroDeposito, Cedula son requeridos',
        data: null,
        totalRecords: 0
      })
    }
    if (error.message === '400-file') {
      return res.status(400).json({
        status: 'error',
        message: 'El comprobante (file) es requerido',
        data: null,
        totalRecords: 0
      })
    }
    if (error.message === '404-idCliente') {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontró la compra ni el cliente',
        data: null,
        totalRecords: 0
      })
    }
    if (error.message === '400-insert') {
      return res.status(400).json({
        status: 'error',
        message: 'Error al subir el deposito',
        data: null,
        totalRecords: 0
      })
    }
    if (error.message && error.message.includes('ya existe en el sistema')) {
      return res.status(409).json({
        status: 'error',
        message: 'El número de depósito ya ha sido registrado previamente',
        data: null,
        totalRecords: 0
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      data: null,
      totalRecords: 0
    })
  }
}
