const fs = require("fs");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const mime = require("mime-types");


// Definir las credenciales de Google Cloud
const keyFilename = path.join(__dirname, '..', 'Key', 'credentials.json');  // Aquí está el archivo JSON de las credenciales
const storage = new Storage({ keyFilename });

/**
 * Función para subir un archivo a Google Cloud Storage.
 * 
 * @param {string} localFilePath - Ruta del archivo local a subir.
 * @param {string} bucketName - Nombre del bucket de Google Cloud Storage.
 * @param {string} cloudPath - Ruta donde se almacenará el archivo en el bucket.
 * @returns {Promise<string>} - URL pública del archivo en Google Cloud Storage.
 */
const uploadFileToCloud = async (localFilePath, bucketName, cloudPath) => {
  try {
    // Verifica si el archivo existe
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`El archivo local no existe en la ruta: ${localFilePath}`);
    }

    // Obtén el tipo de contenido del archivo
    const contentType = mime.lookup(path.extname(localFilePath)) || "application/octet-stream";

    // Obtén el bucket de Google Cloud Storage
    const bucket = storage.bucket(bucketName);

    // Subir el archivo al bucket
    await bucket.file(cloudPath).save(fs.readFileSync(localFilePath), {
      metadata: { contentType }
    });

    // Generar la URL pública del archivo subido
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${cloudPath}`;
    console.log(`Archivo subido exitosamente: ${publicUrl}`);
    fs.unlinkSync(localFilePath); 
    return publicUrl;
  } catch (error) {
    console.error(`Error al subir el archivo a la nube: ${error.message}`);
    throw error;
  }
};

module.exports = { uploadFileToCloud };
