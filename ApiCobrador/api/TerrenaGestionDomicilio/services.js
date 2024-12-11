const { AppDataSource } = require("../config/database");
const multer = require('multer');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const ClientesVerificionTerrena = require("../ClientesVerificionTerrena/model");
const TerrenaGestionDomicilio = require("../TerrenaGestionDomicilio/model");
const TerrenaGestionTrabajo = require("../TerrenaGestionTrabajo/model");
const IngresoCobrador = require("../IngresoCobrador/model");
const { uploadFileToCloud } = require("./uploadFileToCloud");

function getOptionLabel(value, options) {
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : '';
}

async function getPdfDomicilio(idClienteVerificacion) {
    if (!idClienteVerificacion) {
        return res.status(400).json({ message: "El campo idClienteVerificacion es obligatorio" });
    }
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
        const Ingreso = await queryRunner.manager.findOne(IngresoCobrador, { where: { idIngresoCobrador: cliente.idVerificador } });

        if (!Domicilio && !Trabajo) {
            return res.status(404).json({ message: "Información de domicilio y trabajo no encontrada" });
        }

        // Obtener las opciones de vivienda y sus valores
        const tipoVivienda = getOptionLabel(Domicilio?.iTiempoVivienda ?? null, [
            { value: 1, label: "Casa", icon: "home" },
            { value: 2, label: "Departamento", icon: "building" },
            { value: 5, label: "MediaAgua", icon: "leaf" },
            { value: 3, label: "Villa", icon: "tree" },
            { value: 4, label: "Mixta", icon: "building" }
        ]);

        let A = Domicilio?.iTiempoVivienda === 1 ? 'X' : '';
        let B = Domicilio?.iTiempoVivienda === 2 ? 'X' : '';
        let C = Domicilio?.iTiempoVivienda === 5 ? 'X' : '';
        let D = Domicilio?.iTiempoVivienda === 3 ? 'X' : '';
        let E = Domicilio?.iTiempoVivienda === 4 ? 'X' : '';

        const estado = getOptionLabel(Domicilio?.idTerrenaTipoVivienda ?? null, [
            { value: 2, label: "Muy Bueno", icon: "smile-o" },
            { value: 1, label: "Bueno", icon: "meh-o" },
            { value: 3, label: "Malo", icon: "frown-o" }
        ]);

        let F = Domicilio?.idTerrenaTipoVivienda === 2 ? 'X' : '';
        let G = Domicilio?.idTerrenaTipoVivienda === 1 ? 'X' : '';
        let H = Domicilio?.idTerrenaTipoVivienda === 3 ? 'X' : '';

        const zona = getOptionLabel(Domicilio?.idTerrenaZonaVivienda ?? null, [
            { value: 1, label: "Urbano", icon: "building" },
            { value: 2, label: "Rural", icon: "tree" }
        ]);

        let I = Domicilio?.idTerrenaZonaVivienda === 1 ? 'X' : '';
        let J = Domicilio?.idTerrenaZonaVivienda === 2 ? 'X' : '';

        const propiedad = getOptionLabel(Domicilio?.idTerrenaPropiedad ?? null, [
            { value: 1, label: "Propio", icon: "key" },
            { value: 3, label: "Familiar", icon: "users" },
            { value: 2, label: "Arrendado", icon: "money" }
        ]);

        let K = Domicilio?.idTerrenaPropiedad === 1 ? 'X' : '';
        let Q = Domicilio?.idTerrenaPropiedad === 3 ? 'X' : '';
        let L = Domicilio?.idTerrenaPropiedad === 2 ? 'X' : '';

        const acceso = getOptionLabel(Domicilio?.idTerrenaAcceso ?? null, [
            { value: 1, label: "Facil", icon: "key" },
            { value: 2, label: "Dificil", icon: "users" }
        ]);

        let M = Domicilio?.idTerrenaAcceso === 1 ? 'X' : '';
        let N = Domicilio?.idTerrenaAcceso === 2 ? 'X' : '';

        const coberturaSeñal = getOptionLabel(Domicilio?.idTerrenaCobertura ?? null, [
            { value: 1, label: "Llamada Movil", icon: "phone" },
            { value: 2, label: "Whatsapp", icon: "comments" }
        ]);

        let O = Domicilio?.idTerrenaCobertura === 1 ? 'X' : '';
        let P = Domicilio?.idTerrenaCobertura === 2 ? 'X' : '';

        /*terrea trabajo*/
        const tipoTrabajoOptions = [
            { value: 1, label: "Dependiente", icon: "building" },
            { value: 2, label: "Independiente", icon: "briefcase" },
            { value: 3, label: "Informal", icon: "user" }
        ];

        const tipoTrabajo = getOptionLabel(Trabajo?.idTerrenaTipoTrabajo ?? null, tipoTrabajoOptions);
        let R = Trabajo?.idTerrenaTipoTrabajo === 1 ? 'X' : '';
        let S = Trabajo?.idTerrenaTipoTrabajo === 2 ? 'X' : '';
        let T = Trabajo?.idTerrenaTipoTrabajo === 3 ? 'X' : '';

        const Data = {
            FECHA: new Date().toISOString().split('T')[0],
            CEDULA: cliente?.Ruc ?? '',
            NOMBRE: cliente?.Nombres ?? '',
            TELEFONO: cliente?.Celular ?? '',
            iTiempoVivienda: Domicilio?.iTiempoVivienda ?? 0,
            A, B, C, D, E, F, G, H, I, J, K, Q, L, M, N, O, P,
            PuntoReferencia: Domicilio?.PuntoReferencia ?? '',
            PersonaEntrevistada: Domicilio?.PersonaEntrevistada ?? '',
            Observaciones: Domicilio?.Observaciones ?? '',
            VecinoEntreVisto: Domicilio?.VecinoEntreVisto ?? '',
            R, S, T,
            iTiempoTrabajo: Trabajo?.iTiempoTrabajo ?? '',
            iTiempoTrabajoYear: Trabajo?.iTiempoTrabajoYear ?? '',
            dIngresoTrabajo: Trabajo?.dIngresoTrabajo ?? '',
            ActividadTrabajo: Trabajo?.ActividadTrabajo ?? '',
            TelefonoTrabajo: Trabajo?.TelefonoTrabajo ?? '',
            PuntoReferenciaTrabajo: Trabajo?.PuntoReferencia ?? '',
            PersonaEntrevistadaTrabajo: Trabajo?.PersonaEntrevistada ?? '',
            VERIFICADOR: Ingreso?.Nombre ?? '',
            Alq: Domicilio?.ValorArrendado ?? '',
            CallePrincipal: Domicilio?.CallePrincipal ?? '',
            CalleSecundaria: Domicilio?.CalleSecundaria ?? '',
            CallePrincipalTrabajo: Trabajo?.CallePrincipal ?? '',
            CalleSecundariaTrabajo: Trabajo?.CalleSecundaria ?? '',
        };

        // Crear un nuevo documento DOCX
        const inputPath = path.join(__dirname, 'INFORMEVERIFICACIONTERRENA.docx');
        const content = fs.readFileSync(inputPath, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        // Formatear fecha y hora
        const FechaActual = new Date().toISOString().split('T')[0];
        const Hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

        // Aplicar las sustituciones
        doc.render(Data);

        // Generar el documento
        const timestamp = Date.now();
        const modifiedDocument = doc.getZip().generate({ type: 'nodebuffer' });

        // Guardar el archivo modificado localmente
        const docxPath = path.join(__dirname, `contrato_${cliente.Ruc}_${timestamp}.docx`);
        fs.writeFileSync(docxPath, modifiedDocument);

        // Llamar a la función para subir el archivo a Google Cloud Storage
        const bucketName = "sparta_bucket";  // Nombre de tu bucket en Google Cloud
        const cloudPath = `VerificaciónTerrena/${cliente.Ruc}/contrato_${cliente.Ruc}_${timestamp}.docx`;  // Ruta en el bucket
        const publicUrl = await uploadFileToCloud(docxPath, bucketName, cloudPath);  // Subir archivo

        return { message: "Documento creado y subido correctamente.", url: publicUrl };

    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al guardar los datos de protección:", error);

        // Return specific error based on the error code or a generic error message
        if (error.code === '23505') {
            return { error: "El dato ya existe" };
        }

        return { error: "Error interno del servidor" };  // Return generic error message
    } finally {
        await queryRunner.release();
    }
}
module.exports = { getPdfDomicilio };