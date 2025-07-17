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
const { Console } = require("console");

function getOptionLabel(value, options) {
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : '';
}

async function getPdfDomicilio(idClienteVerificacion) {
    if (!idClienteVerificacion) {
        return { error: "El campo idClienteVerificacion es obligatorio" };
    }
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {

        console.log("Iniciando la generación del PDF para el cliente:", idClienteVerificacion);
        const cliente = await queryRunner.manager.findOne(ClientesVerificionTerrena, {
            where: { idClienteVerificacion, iEstado: 1, bDomicilio: 1 },
        });




        if (!cliente) {
            return { error: "Cliente no encontrado" };
        }

        const clienteTrabajoSol = await queryRunner.manager.findOne(ClientesVerificionTerrena, {
            where: { idCre_solicitud: cliente.idCre_solicitud, iEstado: 1, bTrabajo: 1 },
        });

       

        const Domicilio = await queryRunner.manager.findOne(TerrenaGestionDomicilio, {
            where: { idClienteVerificacion, tipoVerificacion: 2 }
        });

         console.log("Cliente encontrado domicilio:", Domicilio);

        let Trabajo = null;

        if (clienteTrabajoSol && clienteTrabajoSol.bTrabajo) {
            console.log("Cliente tiene trabajo, buscando información de trabajo...");

         
                Trabajo = await queryRunner.manager.findOne(TerrenaGestionTrabajo, {
                    where: { idClienteVerificacion: clienteTrabajoSol.idClienteVerificacion, tipoVerificacion: 2 }
                });
            
        }

 
        const Ingreso = await queryRunner.manager.findOne(IngresoCobrador, {
            where: { idIngresoCobrador: cliente.idVerificador }
        });

        if (!Domicilio && !Trabajo) {
            return { error: "Información de domicilio y trabajo no encontrada" };
        }

        const A = Domicilio?.idTerrenaTipoVivienda === 1 ? 'X' : '';
        const B = Domicilio?.idTerrenaTipoVivienda === 2 ? 'X' : '';
        const C = Domicilio?.idTerrenaTipoVivienda === 5 ? 'X' : '';
        const D = Domicilio?.idTerrenaTipoVivienda === 3 ? 'X' : '';
        const E = Domicilio?.idTerrenaTipoVivienda === 4 ? 'X' : '';

        const F = Domicilio?.idTerrenaEstadoVivienda === 2 ? 'X' : '';
        const G = Domicilio?.idTerrenaEstadoVivienda === 1 ? 'X' : '';
        const H = Domicilio?.idTerrenaEstadoVivienda === 3 ? 'X' : '';

        const I = Domicilio?.idTerrenaZonaVivienda === 1 ? 'X' : '';
        const J = Domicilio?.idTerrenaZonaVivienda === 2 ? 'X' : '';

        const K = Domicilio?.idTerrenaPropiedad === 1 ? 'X' : '';
        const Q = Domicilio?.idTerrenaPropiedad === 3 ? 'X' : '';
        const L = Domicilio?.idTerrenaPropiedad === 2 ? 'X' : '';

        const M = Domicilio?.idTerrenaAcceso === 1 ? 'X' : '';
        const N = Domicilio?.idTerrenaAcceso === 2 ? 'X' : '';

        const O = Domicilio?.idTerrenaCobertura === 1 ? 'X' : '';
        const P = Domicilio?.idTerrenaCobertura === 2 ? 'X' : '';

        const R = Trabajo?.idTerrenaTipoTrabajo === 1 ? 'X' : '';
        const S = Trabajo?.idTerrenaTipoTrabajo === 2 ? 'X' : '';
        const T = Trabajo?.idTerrenaTipoTrabajo === 3 ? 'X' : '';

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
            CallePrincipal: Domicilio?.CallePrincipal ?? '',
            CalleSecundaria: Domicilio?.CalleSecundaria ?? '',
            CallePrincipalTrabajo: Trabajo?.CallePrincipal ?? '',
            CalleSecundariaTrabajo: Trabajo?.CalleSecundaria ?? '',
            VERIFICADOR: Ingreso?.Nombre ?? '',
            Alq: Domicilio?.ValorArrendado ?? ''
        };

        const inputPath = path.join(__dirname, 'INFORMEVERIFICACIONTERRENA2.docx');
        const content = fs.readFileSync(inputPath, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        doc.render(Data);

        const timestamp = Date.now();
        const modifiedDocument = doc.getZip().generate({ type: 'nodebuffer' });

        const docxPath = path.join(__dirname, `contrato_${cliente.Ruc}_${timestamp}.docx`);
        fs.writeFileSync(docxPath, modifiedDocument);

        const bucketName = "sparta_bucket";
        const cloudPath = `VerificaciónTerrena/${cliente.Ruc}/contrato_${cliente.Ruc}_${timestamp}.docx`;
        const publicUrl = await uploadFileToCloud(docxPath, bucketName, cloudPath);
        await queryRunner.commitTransaction();
        return { message: "Documento creado y subido correctamente.", url: publicUrl };

    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al guardar los datos de protección:", error);

        if (error.code === '23505') {
            return { error: "El dato ya existe" };
        }

        return { error: "Error interno del servidor" };
    } finally {
        await queryRunner.release();
    }
}

module.exports = { getPdfDomicilio };