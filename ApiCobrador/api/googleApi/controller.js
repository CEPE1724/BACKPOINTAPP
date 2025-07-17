const { Storage } = require('@google-cloud/storage')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

// Cargar las credenciales de Google Cloud desde un archivo JSON
const credentialsPath = path.join(__dirname, '../../api/key/credentials.json')
const credentials = JSON.parse(fs.readFileSync(credentialsPath))

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n')
  }
})

// Ruta donde se guardarán temporalmente los archivos en el servidor
const uploadDir = path.join(__dirname, '../documentos')

// Configurar Multer para manejar la carga de archivos
exports.upload = multer({
  storage: multer.memoryStorage()
})

// Controlador para manejar la subida de archivos a Google Cloud Storage
exports.uploadFileToGCS = async (req, res) => {
  try {
    const { cedula, nombre_del_archivo, tipo } = req.body

    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: "Se requiere un archivo 'file'." })
    }
    if (!cedula || !nombre_del_archivo || !tipo) {
      return res
        .status(400)
        .json({
          status: 'error',
          message: "Se requiere 'cedula', 'nombre_del_archivo', y 'tipo'."
        })
    }

    const file = req.file

    // Verificar si el directorio de carga existe, si no, crearlo
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const fileName = `${nombre_del_archivo}`
    const filePath = path.join(uploadDir, fileName)

    fs.writeFileSync(filePath, file.buffer)
    console.log(`${fileName} guardado en el servidor local.`)

    const bucketName = 'sparta_bucket'
    const destination = `VerificacionTerrena/${tipo}/${cedula}/${fileName}`
    const bucket = storage.bucket(bucketName)
    let gcsFile = bucket.file(destination)

    const [exists] = await gcsFile.exists()
    if (exists) {
      const timestamp = Date.now()
      gcsFile = bucket.file(
        `VerificacionTerrena/${tipo}/${cedula}/${nombre_del_archivo}_${timestamp}`
      )
    }

    const options = {
      destination: gcsFile,
      metadata: {
        contentType: file.mimetype // Usar el tipo de archivo dinámicamente
      }
    }

    await bucket.upload(filePath, options)
    console.log(`${fileName} subido a ${bucketName}.`)

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsFile.name}`

    res.json({
      status: 'success',
      message: `${fileName} subido exitosamente a Google Cloud Storage.`,
      url: publicUrl
    })

    fs.unlinkSync(filePath)
    console.log(`${fileName} eliminado del servidor local.`)
  } catch (error) {
    console.error('Error al subir el archivo:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor.'
    })
  }
}

exports.uploadFileToGCSLatinium = async (req, res) => {
  try {
    const { cedula, tipo, Directorio } = req.body

    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'error', message: "Se requiere un archivo 'file'." })
    }
    if (!cedula || !tipo) {
      return res
        .status(400)
        .json({ status: 'error', message: "Se requiere 'cedula', 'tipo'." })
    }

    const file = req.file

    // Verificar si el directorio de carga existe, si no, crearlo
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Generar un timestamp único para el nombre del archivo
    const timestamp = Date.now()
    const fileName = `${timestamp}${path.extname(file.originalname)}` // Usamos la extensión original del archivo
    const filePath = path.join(uploadDir, fileName)

    // Guardar el archivo temporalmente en el servidor local
    fs.writeFileSync(filePath, file.buffer)
    console.log(`${fileName} guardado en el servidor local.`)

    const bucketName = 'sparta_bucket'
    const destination = `${Directorio}/${tipo}/${cedula}/${fileName}`
    const bucket = storage.bucket(bucketName)
    let gcsFile = bucket.file(destination)

    // Verificar si el archivo ya existe en GCS
    const [exists] = await gcsFile.exists()
    if (exists) {
      // Si existe, renombrar el archivo con un nuevo timestamp
      const newTimestamp = Date.now()
      gcsFile = bucket.file(
        `${Directorio}/${tipo}/${cedula}/${newTimestamp}${path.extname(file.originalname)}`
      )
    }

    // Configuración de las opciones de carga
    const options = {
      destination: gcsFile,
      metadata: {
        contentType: file.mimetype // Usar el tipo de archivo dinámicamente
      }
    }

    // Subir el archivo al bucket de GCS
    await bucket.upload(filePath, options)
    console.log(`${fileName} subido a ${bucketName}.`)

    // Obtener la URL pública del archivo subido
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsFile.name}`

    // Responder con la URL del archivo subido
    res.json({
      status: 'success',
      message: `${fileName} subido exitosamente a Google Cloud Storage.`,
      url: publicUrl
    })

    // Eliminar el archivo del servidor local después de subirlo
    fs.unlinkSync(filePath)
    console.log(`${fileName} eliminado del servidor local.`)
  } catch (error) {
    console.error('Error al subir el archivo:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor.'
    })
  }
}
