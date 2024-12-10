const { AppDataSource } = require("../config/database");
const multer = require('multer');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DocxtemplaterImageModule = require('docxtemplater-image-module');
const fs = require('fs');
const path = require('path');
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const TerrenaGestionDomicilio = require("../TerrenaGestionDomicilio/model");
const TerrenaGestionTrabajo = require("../TerrenaGestionTrabajo/model");
const puppeteer = require('puppeteer');

// Función para generar la imagen del mapa
async function generateMapImage(lat, lon) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // HTML básico para el mapa de Leaflet
    const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Leaflet Map</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
            <script src="https://unpkg.com/leaflet-image@0.4.0/leaflet-image.js"></script>
        </head>
        <body>
            <div id="map" style="width: 600px; height: 400px;"></div>
            <script>
                var map = L.map('map').setView([${lat}, ${lon}], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                L.marker([${lat}, ${lon}]).addTo(map).bindPopup('Ubicación').openPopup();
            </script>
        </body>
        </html>
    `;

    await page.setContent(mapHtml);

    // Capturar la imagen del mapa
    const mapImageBuffer = await page.screenshot();
    await browser.close();
    return mapImageBuffer;
}

exports.addNew = async (req, res) => {
    const { idClienteVerificacion } = req.body;

    // Validación de campos obligatorios
    if (!idClienteVerificacion) {
        return res.status(400).json({ message: "El campo idClienteVerificacion es obligatorio" });
    }

    // Inicia una transacción
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
        // Obtener el cliente
        const cliente = await queryRunner.manager.findOne(ClientesVerificionTerrena, { where: { idClienteVerificacion: idClienteVerificacion } });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Obtener información de domicilio y trabajo
        const Domicilio = await queryRunner.manager.findOne(TerrenaGestionDomicilio, { where: { idClienteVerificacion } });
        const Trabajo = await queryRunner.manager.findOne(TerrenaGestionTrabajo, { where: { idClienteVerificacion } });

        if (!Domicilio || !Trabajo) {
            return res.status(404).json({ message: "Información de domicilio o trabajo no encontrada" });
        }

        // Obtener las coordenadas (latitud y longitud)
        const lat = Domicilio.latitud;
        const lon = Domicilio.longitud;

        // Generar la imagen del mapa utilizando Puppeteer
        const mapImageBuffer = await generateMapImage(lat, lon);

        // Obtener las opciones de vivienda y sus valores
        const tipoVivienda = getOptionLabel(Domicilio.iTiempoVivienda, [
            { value: 1, label: "Casa", icon: "home" },
            { value: 3, label: "Villa", icon: "tree" },
            { value: 4, label: "Mixta", icon: "building" },
            { value: 2, label: "Departamento", icon: "building" },
            { value: 5, label: "MediaAgua", icon: "leaf" }
        ]);

        const estado = getOptionLabel(Domicilio.idTerrenaTipoVivienda, [
            { value: 2, label: "Muy Bueno", icon: "smile-o" },
            { value: 1, label: "Bueno", icon: "meh-o" },
            { value: 3, label: "Malo", icon: "frown-o" }
        ]);

        const zona = getOptionLabel(Domicilio.idTerrenaZonaVivienda, [
            { value: 1, label: "Urbano", icon: "building" },
            { value: 2, label: "Rural", icon: "tree" }
        ]);

        const propiedad = getOptionLabel(Domicilio.idTerrenaPropiedad, [
            { value: 1, label: "Propio", icon: "key" },
            { value: 3, label: "Familiar", icon: "users" },
            { value: 2, label: "Arrendado", icon: "money" }
        ]);

        const acceso = getOptionLabel(Domicilio.idTerrenaAcceso, [
            { value: 1, label: "Facil", icon: "key" },
            { value: 2, label: "Dificil", icon: "users" }
        ]);

        const coberturaSeñal = getOptionLabel(Domicilio.idTerrenaCobertura, [
            { value: 1, label: "Llamada Movil", icon: "phone" },
            { value: 2, label: "Whatsapp", icon: "comments" }
        ]);

        const Data = {
            FECHA: new Date().toISOString().split('T')[0],
            CEDULA: cliente.Ruc,
            NOMBRE: cliente.Nombres,
            TELEFONO: cliente.Celular,
            iTiempoVivienda: Domicilio.iTiempoVivienda || 0,
            idTerrenaTipoVivienda: tipoVivienda,
            idTerrenaEstadoVivienda: estado,
            idTerrenaZonaVivienda: zona,
            idTerrenaPropiedad: propiedad,
            idTerrenaAcceso: acceso,
            idTerrenaCobertura: coberturaSeñal,
            PuntoReferencia: Domicilio.PuntoReferencia || '',
            PersonaEntrevistada: Domicilio.PersonaEntrevistada || '',
            Observaciones: Domicilio.Observaciones || '',
            VecinoEntreVisto: Domicilio.VecinoEntreVisto || '',
            MAPA: { 
                getImage: () => mapImageBuffer,  // Usamos el buffer de la imagen generada
                extension: 'png'  // Especificamos que la imagen es PNG
            }
        };

        // Crear un nuevo documento DOCX
        const inputPath = path.join(__dirname, 'INFORMEVERIFICACIONTERRENA.docx');
        const content = fs.readFileSync(inputPath, 'binary');
        const zip = new PizZip(content);

        // Definir el módulo de imágenes
        const imageModule = new DocxtemplaterImageModule({
            getImage: (tagValue, context) => mapImageBuffer,  // Aquí devolvemos el buffer de la imagen
            getSize: (img, tagValue, context) => [600, 400],  // Definimos el tamaño de la imagen
        });

        // Crear el documento DOCX con el módulo de imágenes
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true, 
            linebreaks: true,
            modules: [imageModule]  // Incluir el módulo de imágenes
        });

        // Aplicar las sustituciones
        doc.render(Data);

        // Generar el documento
        const timestamp = Date.now();
        const modifiedDocument = doc.getZip().generate({ type: 'nodebuffer' });

        // Guardar el archivo modificado localmente
        const docxPath = path.join(__dirname, `contrato_${cliente.Ruc}_${timestamp}.docx`);
        fs.writeFileSync(docxPath, modifiedDocument);

        return res.status(200).json({ message: "Documento creado correctamente." });

    } catch (error) {
        // Realizar un rollback si ocurre un error
        await queryRunner.rollbackTransaction();

        console.error("Error al guardar los datos de protección:", error);

        // Manejo de errores específicos
        if (error.code === '23505') {
            return res.status(400).json({ message: "El dato ya existe" });
        }

        // En caso de error general
        return res.status(500).json({ message: "Error al guardar el documento." });
    } finally {
        // Asegurarse de que la transacción se cierre
        await queryRunner.release();
    }
};

// Función para obtener la etiqueta de una opción
function getOptionLabel(value, options) {
    const option = options.find(o => o.value === value);
    return option ? option.label : 'Desconocido';
}
