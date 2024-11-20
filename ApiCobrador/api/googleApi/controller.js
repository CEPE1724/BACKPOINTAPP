const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Cargar las credenciales de Google Cloud desde un archivo JSON
const credentialsPath = path.join(__dirname, "../../api/key/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, "\n"),
  },
});

// Ruta donde se guardarán temporalmente los archivos en el servidor
const uploadDir = path.join(__dirname, "../documentos");

// Configurar Multer para manejar la carga de archivos
exports.upload = multer({
  storage: multer.memoryStorage(),
});

// Controlador para manejar la subida de archivos a Google Cloud Storage
exports.uploadFileToGCS = async (req, res) => {
  try {
    const { cedula, nombre_del_archivo, tipo } = req.body;

    if (!req.file) {
      return res.status(400).json({ status: "error", message: "Se requiere un archivo 'file'." });
    }
    if (!cedula || !nombre_del_archivo || !tipo) {
      return res.status(400).json({ status: "error", message: "Se requiere 'cedula', 'nombre_del_archivo', y 'tipo'." });
    }

    const file = req.file;

    // Verificar si el directorio de carga existe, si no, crearlo
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${nombre_del_archivo}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);
    console.log(`${fileName} guardado en el servidor local.`);

    const bucketName = "sparta_bucket";
    const destination = `VerificacionTerrena/${tipo}/${cedula}/${fileName}`;
    const bucket = storage.bucket(bucketName);
    let gcsFile = bucket.file(destination);

    const [exists] = await gcsFile.exists();
    if (exists) {
      const timestamp = Date.now();
      gcsFile = bucket.file(`VerificacionTerrena/${tipo}/${cedula}/${nombre_del_archivo}_${timestamp}`);
    }

    const options = {
      destination: gcsFile,
      metadata: {
        contentType: file.mimetype, // Usar el tipo de archivo dinámicamente
      },
    };

    await bucket.upload(filePath, options);
    console.log(`${fileName} subido a ${bucketName}.`);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsFile.name}`;

    res.json({
      status: "success",
      message: `${fileName} subido exitosamente a Google Cloud Storage.`,
      url: publicUrl,
    });

    fs.unlinkSync(filePath);
    console.log(`${fileName} eliminado del servidor local.`);
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
};
