const { AppDataSource } = require("../ApiCobrador/api/config/database");
const { parseSegmentacion } = require("./dto/interconnect/Segmentacion.dto");
const { parseInterconnectResultadoPoliticas } = require("./dto/interconnect/resultado_politicas.dto");
const { parseInterconnectResultado } = require("./dto/interconnect/resultado.dto");
const { parseInformacionSRI } = require("./dto/reporteCrediticio/informacion_sri.dto");
const { parseResumenInforme } = require("./dto/reporteCrediticio/resumen_informe.dto");
const EQFX_IdentificacionConsultada = require('../Equifax/api/EQFX_IdentificacionConsultada/model');
const EQFX_UAT_resultado_segmentacion = require('../ApiCobrador/api/EQFX_UAT_resultado_segmentacion/model');
const EQFX_UAT_resultado_politicas = require('../ApiCobrador/api/EQFX_UAT_resultado_politicas/model');
const EQFX_UAT_resultado = require('../ApiCobrador/api/EQFX_UAT_resultado/model');
const EQFX_UAT_informacion_sri = require('../ApiCobrador/api/EQFX_UAT_informacion_sri/model');
const EQFX_UAT_resumen_informe = require('../ApiCobrador/api/EQFX_UAT_resumen_informe/model');

const { getEquifaxToken } = require("../Equifax_UAT/services/equifaxToken.service");
const { executeEquifaxOrchestration } = require("../Equifax_UAT/services/equifaxOrchestration.service");
/**
 * Main controller for Equifax Orchestration
 */
exports.equifaxOauth = async (req, res) => {
    const { tipoDocumento, numeroDocumento } = req.body;
    const validDocumentTypes = ['C'];

    if (!validDocumentTypes.includes(tipoDocumento)) {
        return res.status(400).json({
            status: 'error',
            message: 'Tipo de documento no válido. Debe ser C',
            data: null
        });
    }

    if (!numeroDocumento || numeroDocumento.length !== 10) {
        return res.status(400).json({
            status: 'error',
            message: 'Número de documento inválido. Debe tener 10 dígitos.',
            data: null
        });
    }

    try {
        const tokenResponse = await getEquifaxToken();
        if (tokenResponse.status === 'error') {
            return res.status(500).json(tokenResponse);
        }

        const token = tokenResponse.access_token;
        const orchestrationResponse = await executeEquifaxOrchestration(token, tipoDocumento, numeroDocumento);

        if (orchestrationResponse.status === 'error') {
            return res.status(500).json(orchestrationResponse);
        }

        const {
            interconnect, transactionId,
            originalTransactionId, integrante_facturacion = [],
            reporteCrediticio = {}
        } = orchestrationResponse;

        const {
            identificacion_consultada = [],
            informacion_sri = [],
            resumen_informe = [],
            score_inclusion = [],
            score = [],
            score_sobreendeudamiento = [],
            indicador_impacto_economico = [],
            index_pymes = [],
            historico_score = [],
            historico_acreedores = [],
            historico_cuota_estimada = [],
            historico_endeudamiento_comercial = [],
            historico_endeudamiento_financiero = [],
            historico_vencidos_comercial = [],
            historico_vencidos_financiero = [],
            valor_deuda_3_sistemas = [],
            protestos_morosidades = [],
            evolucion_deuda_sb_seps_sicom = [],
            detalle_deuda_actual_sb = [],
            detalle_deuda_actual_seps = [],
            detalle_deuda_actual_sicom = [],
            detalle_tarjetas = [],
            distribucion_endeudamiento = [],
            deuda_historica = [],
            estructura_vencimiento = [],
            creditos_otorgados = [],
            saldos_por_vencer = [],
            detalle_estructura_vencimiento = [],
            cuota_estimada_mensual = [],
            personas_inhabilitadas = [],
            sujeto_al_dia = [],
            mantiene_historial_crediticio = [],
            identificador_perfil_riesgo_directo = [],
            identificador_perfil_riesgo_directo_6_meses = [],
            garantias_personales_codeudores_operaciones_vigentes = [],
            garantias_personales_codeudores_operaciones_no_vigentes = [],
            vinculaciones_instituciones_financieras = [],
            operaciones_canceladas = [],
            tarjetas_canceladas = [],
            informacion_demografica = [],
            mensaje_califica_detalle_tarjetas = [],
            factores_influyen_score = [],
            entidades_consultados = [],
            detalle_deuda_historica_sb = [],
            detalle_deuda_historica_seps = [],
            detalle_deuda_historica_sicom = []

        } = reporteCrediticio;

        console.log("Datos de reporte crediticio:", {
            informacion_sri
        });


        const segmentacionDTO = parseSegmentacion(interconnect.resultado_segmentacion || []);
        const politicasDTO = parseInterconnectResultadoPoliticas(interconnect.resultado_politicas || []);
        const resultadoDTO = parseInterconnectResultado(interconnect.resultado || []);
        const sriDTO = parseInformacionSRI(informacion_sri || []);
        const resumenInformeDTO = parseResumenInforme(reporteCrediticio.resumen_informe || []);
        console.log("Datos de SRI:", sriDTO);

        // Guardar en la base de datos
        const identificacionRepo = AppDataSource.getRepository(EQFX_IdentificacionConsultada);
        const newRegistro = identificacionRepo.create({
            TipoDocumento: tipoDocumento,
            NumeroDocumento: numeroDocumento,
            originalTransactionId: transactionId,
            UAT: 1,
            NombreSujeto: integrante_facturacion[0]?.nombre || ''
        });

        await identificacionRepo.save(newRegistro);
        const idEQFX_IdentificacionConsultada = newRegistro.idEQFX_IdentificacionConsultada;

        await saveDTODataIfExists(
            AppDataSource.getRepository(EQFX_UAT_resultado_segmentacion),
            segmentacionDTO,
            'idEQFX_IdentificacionConsultada',
            idEQFX_IdentificacionConsultada
        );

        await saveDTODataIfExists(
            AppDataSource.getRepository(EQFX_UAT_resultado_politicas),
            politicasDTO,
            'idEQFX_IdentificacionConsultada',
            idEQFX_IdentificacionConsultada
        );

        await saveDTODataIfExists(
            AppDataSource.getRepository(EQFX_UAT_resultado),
            resultadoDTO,
            'idEQFX_IdentificacionConsultada',
            idEQFX_IdentificacionConsultada
        );

        await saveDTODataIfExists(
            AppDataSource.getRepository(EQFX_UAT_informacion_sri),
            sriDTO,
            'idEQFX_IdentificacionConsultada',
            idEQFX_IdentificacionConsultada
        );

        await saveDTODataIfExists(
            AppDataSource.getRepository(EQFX_UAT_resumen_informe),
            resumenInformeDTO,
            'idEQFX_IdentificacionConsultada',
            idEQFX_IdentificacionConsultada
        );

        return res.status(200).json({
            status: 'success',
            data: transactionId,
            originalTransactionId
        });

    } catch (error) {
        console.error("Error en equifaxOauth:", error.message || error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            data: null
        });
    }
};


async function saveDTODataIfExists(repository, dtoData, foreignKeyName, foreignKeyValue) {
    if (!dtoData || (Array.isArray(dtoData) && dtoData.length === 0)) return;

    const dataToSave = Array.isArray(dtoData)
        ? dtoData.map(item => repository.create({ [foreignKeyName]: foreignKeyValue, ...item }))
        : [repository.create({ [foreignKeyName]: foreignKeyValue, ...dtoData })];

    await repository.save(dataToSave);
}
