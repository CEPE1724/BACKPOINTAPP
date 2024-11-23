const { AppDataSource } = require("../config/database");
const multer = require('multer');
const DatosProteccion = require("./model");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const { uploadFileToCloud } = require("./uploadFileToCloud");
exports.addNew = async (req, res) => {
    const { Cedula, Nombre, Apellido, IpWeb, CodigoDactilar, UrlImagen } = req.body;
    console.log("ENTRO AQUI");
    // Validación de datos (puedes agregar más validaciones según tus necesidades)
    if (!Cedula || !Nombre || !Apellido || !IpWeb || !CodigoDactilar, !UrlImagen) {
        console.log("ENTRO AQUI", Cedula, Nombre, Apellido, IpWeb, CodigoDactilar, UrlImagen);
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    console.log("ENTRO AQUI");
  
    // Inicia una transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
  
    try {
      // Crear un nuevo documento DOCX (no lo guardamos todavía)
      const inputPath = path.join(__dirname, 'Contrato.docx');
      const content = fs.readFileSync(inputPath, 'binary');
  
      // Crear un nuevo documento a partir del original
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      const Nombres = Nombre + ' ' + Apellido;
  
      // Formatear fecha en formato yyyy-MM-dd
      const FechaActual = new Date().toISOString().split('T')[0];
  
      // Formatear hora en formato hh:mm:ss AM/PM
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const Hora = new Date().toLocaleTimeString('es-ES', options);
  
      // Reemplazar los valores en el documento con los datos del personal freelance
      const data = {
        Cedula,
        Nombre: Nombres,
        IpWeb,
        Fecha: FechaActual,
        Hora,
      };
  
      // Aplicar las sustituciones
      doc.render(data);
      const timestamp = Date.now();
      const modifiedDocument = doc.getZip().generate({ type: 'nodebuffer' });
  
      // Guardar el archivo modificado localmente
      const docxPath = path.join(__dirname, `contrato_${Cedula}_${timestamp}.docx`);
      fs.writeFileSync(docxPath, modifiedDocument);
  
      // Llamar a la función para subir el archivo a Google Cloud Storage
      const bucketName = "sparta_bucket";  // Nombre de tu bucket en Google Cloud
      const cloudPath = `ProteccionDeDatos/${Cedula}/contrato_${Cedula}_${timestamp}.docx`;  // Ruta en el bucket
      const publicUrl = await uploadFileToCloud(docxPath, bucketName, cloudPath);  // Subir archivo
  
      // Ahora que tenemos la URL pública, podemos guardar los datos en la base de datos
      const DatosProteccionRepository = queryRunner.manager.getRepository(DatosProteccion);
      const newDatosProteccion = DatosProteccionRepository.create({
        Cedula,
        Nombre,
        Apellido,
        CodigoDactilar,
        IpWeb,
        Fecha: new Date(),
        UrlContrato: publicUrl , // Guardamos la URL del contrato subido
        UrlImage: UrlImagen
      });
  
      // Guardar en la base de datos dentro de la transacción
      await DatosProteccionRepository.save(newDatosProteccion);
  
      // Si todo está bien, confirma la transacción
      await queryRunner.commitTransaction();
  
      // Respuesta exitosa
      res.status(201).json({ message: "Datos de protección guardados correctamente", UrlContrato: publicUrl });
  
    } catch (error) {
      // Si ocurre un error, realiza un rollback
      await queryRunner.rollbackTransaction();
  
      console.error("Error al guardar los datos de protección:", error);
      // Si el error es debido a una violación de clave única, o similar, manejarlo apropiadamente
      if (error.code === '23505') {
        return res.status(400).json({ message: "El dato ya existe" });
      }
  
      // Error genérico de servidor
      res.status(500).json({ message: "Error interno del servidor" });
    } finally {
      // Liberar el queryRunner después de la transacción
      await queryRunner.release();
    }
  };


exports.generatePdf = async (req, res) => {
    try {
      const { Cedula, Nombre, Apellido, IpWeb, CodigoDactilar } = req.body;
  
      const inputPath = path.join(__dirname, 'Contrato.docx');
      const content = fs.readFileSync(inputPath, 'binary');
  
      // Crear un nuevo documento a partir del original
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      const Nombres = Nombre + ' ' + Apellido;
  
      // Formatear fecha en formato yyyy-MM-dd
      const FechaActual = new Date().toISOString().split('T')[0];
  
      // Formatear hora en formato hh:mm:ss AM/PM
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const Hora = new Date().toLocaleTimeString('es-ES', options);
  
      // Reemplazar los valores en el documento con los datos del personal freelance
      const data = {
        Cedula,
        Nombre: Nombres,
        IpWeb,
        Fecha: FechaActual,
        Hora,
      };
  
      // Aplicar las sustituciones
      doc.render(data);
      const timestamp = Date.now();
      const modifiedDocument = doc.getZip().generate({ type: 'nodebuffer' });
  
      // Guardar el archivo modificado localmente
      const docxPath = path.join(__dirname, `contrato_${Cedula}_${timestamp}.docx`);
      fs.writeFileSync(docxPath, modifiedDocument);
  
      // Llamar a la función para subir el archivo a Google Cloud Storage
      const bucketName = "sparta_bucket";  // Nombre de tu bucket en Google Cloud
      const cloudPath = `ProteccionDeDatos/${Cedula}/contrato_${Cedula}_${timestamp}.docx`;  // Ruta en el bucket
      const publicUrl = await uploadFileToCloud(docxPath, bucketName, cloudPath);  // Subir archivo
  
      // Retornar el archivo modificado y la URL pública
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', 'attachment; filename=contrato_comision_modificado.docx');
      res.send(modifiedDocument);
  
      // Aquí puedes hacer algo con la URL pública que recibes de Google Cloud Storage, si es necesario
      console.log('El archivo ha sido subido a la nube:', publicUrl);
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error al modificar el documento: ' + error.message);
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        
        // Verificar si la carpeta existe, si no la crea
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        
        cb(null, uploadDir); // Dirección en la que se guardará el archivo
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Usar el timestamp actual como nombre
        const fileExtension = path.extname(file.originalname); // Mantener la extensión original
        cb(null, `${timestamp}${fileExtension}`); // Generar nombre único con timestamp
    }
});
  
  const upload = multer({ storage: storage });
  
  exports.subirImagen = [
    upload.single('image'),  // 'image' es el nombre del campo en el formulario o el parámetro del body
    
    async (req, res) => {
        try {
            const { Cedula } = req.body;
        
            // Validar si se ha subido un archivo
            if (!req.file) {
                return res.status(400).json({ message: "No se ha subido ningún archivo" });
            }
        
            // Validar si se ha proporcionado la cédula
            if (!Cedula) {
                return res.status(400).json({ message: "La cédula es obligatoria" });
            }
        
            const bucketName = "sparta_bucket";  // Nombre de tu bucket en Google Cloud
            const cloudPath = `ProteccionDeDatos/${Cedula}/${req.file.filename}`;  // Usar el nombre con timestamp
            const publicUrl = await uploadFileToCloud(req.file.path, bucketName, cloudPath);  // Subir archivo
        
            // Eliminar el archivo temporal subido al servidor
            fs.unlinkSync(req.file.path);
        
            // Respuesta exitosa
            res.status(201).json({ message: "Imagen subida correctamente", UrlImagen: publicUrl });
        
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: "Error al subir la imagen", error: error.message });
        }
    }
];