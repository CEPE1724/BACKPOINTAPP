const { AppDataSource } = require("../ApiCobrador/api/config/database");
const { parseSegmentacion } = require("./dto/interconnect/Segmentacion.dto");
const { parseInterconnectResultadoPoliticas } = require("./dto/interconnect/resultado_politicas.dto");
const { parseInterconnectResultado } = require("./dto/interconnect/resultado.dto");
const { parseInformacionSRI } = require("./dto/reporteCrediticio/informacion_sri.dto");
const { parseResumenInforme } = require("./dto/reporteCrediticio/resumen_informe.dto");
const { parseScoreInclusion } = require("./dto/reporteCrediticio/score_inclusion.dto");
const { parseScore } = require("./dto/reporteCrediticio/score.dto");
const { parseScoreSobreendeudamiento } = require("./dto/reporteCrediticio/score_sobreendeudamiento");
const { parseIndicadorImpactoEconomico } = require("./dto/reporteCrediticio/indicador_impacto_economico.dto");
const { parseHistoricoScore } = require("./dto/reporteCrediticio/historico_score.dto");
const { parseHistoricoAcreedores } = require("./dto/reporteCrediticio/historico_acreedores.dto");
const { parseHistoricoCuotaEstimada } = require("./dto/reporteCrediticio/historico_cuota_estimada.dto");
const { parseHistoricoEndeudamientoComercial } = require("./dto/reporteCrediticio/historico_endeudamiento_comercial.dto");
const { parseHistoricoVencidosComercial } = require("./dto/reporteCrediticio/historico_vencidos_comercial.dto");
const { parseValorDeuda3Sistemas } = require("./dto/reporteCrediticio/valor_deuda_3_sistemas.dto");
const { parseProtestosMorosidades } = require("./dto/reporteCrediticio/protestos_morosidades.dto");
const { parseEvolucionDeudaSBSEPSICOM } = require("./dto/reporteCrediticio/evolucion_deuda_sb_seps_sicom.dto");
const { parseDetalleDeudaActualSB } = require("./dto/reporteCrediticio/detalle_deuda_actual_sb.dto");
const { parseDetalleDeudaActualSeps } = require("./dto/reporteCrediticio/detalle_deuda_actual_seps.dto");
const { parseDetalleDeudaActualSicom } = require("./dto/reporteCrediticio/detalle_deuda_actual_sicom.dto");
const { parseDetalleTarjetas } = require("./dto/reporteCrediticio/detalle_tarjetas.dto");
const { parseDistribucionEndeudamiento } = require("./dto/reporteCrediticio/distribucion_endeudamiento.dto");
const { parseDeudaHistorica } = require("./dto/reporteCrediticio/deuda_historica.dto");
const { parseEstructuraVencimiento } = require("./dto/reporteCrediticio/estructura_vencimiento.dto");
const { parseCreditosOtorgados  } = require("./dto/reporteCrediticio/creditos_otorgados.dto");
const { parseSaldosPorVencer } = require("./dto/reporteCrediticio/saldos_por_vencer.dto");
const { parseDetalleEstructuraVencimiento } = require("./dto/reporteCrediticio/detalle_estructura_vencimiento.dto");





const EQFX_IdentificacionConsultada = require('../Equifax/api/EQFX_IdentificacionConsultada/model');
const EQFX_UAT_resultado_segmentacion = require('../ApiCobrador/api/EQFX_UAT_resultado_segmentacion/model');
const EQFX_UAT_resultado_politicas = require('../ApiCobrador/api/EQFX_UAT_resultado_politicas/model');
const EQFX_UAT_resultado = require('../ApiCobrador/api/EQFX_UAT_resultado/model');
const EQFX_UAT_informacion_sri = require('../ApiCobrador/api/EQFX_UAT_informacion_sri/model');
const EQFX_UAT_resumen_informe = require('../ApiCobrador/api/EQFX_UAT_resumen_informe/model');
const EQFX_UAT_score_inclusion = require('../ApiCobrador/api/EQFX_UAT_score_inclusion/model');
const EQFX_UAT_score = require('../ApiCobrador/api/EQFX_UAT_score/model');
const EQFX_UAT_score_sobreendeudamiento = require('../ApiCobrador/api/EQFX_UAT_score_sobreendeudamiento/model');
const EQFX_UAT_indicador_impacto_economico = require('../ApiCobrador/api/EQFX_UAT_indicador_impacto_economico/model');
const EQFX_UAT_historico_score = require('../ApiCobrador/api/EQFX_UAT_historico_score/model');
const EQFX_UAT_historico_acreedores = require('../ApiCobrador/api/EQFX_UAT_historico_acreedores/model');
const EQFX_UAT_historico_cuota_estimada = require('../ApiCobrador/api/EQFX_UAT_historico_cuota_estimada/model');
const EQFX_UAT_historico_endeudamiento_comercial = require('../ApiCobrador/api/EQFX_UAT_historico_endeudamiento_comercial/model');
const EQFX_UAT_historico_endeudamiento_financiero = require('../ApiCobrador/api/EQFX_UAT_historico_endeudamiento_financiero/model');
const EQFX_UAT_historico_vencidos_comercial = require('../ApiCobrador/api/EQFX_UAT_historico_vencidos_comercial/model');
const EQFX_UAT_historico_vencidos_financiero = require('../ApiCobrador/api/EQFX_UAT_historico_vencidos_financiero/model');
const EQFX_UAT_valor_deuda_3_sistemas = require('../ApiCobrador/api/EQFX_UAT_valor_deuda_3_sistemas/model');
const EQFX_UAT_protestos_morosidades = require('../ApiCobrador/api/EQFX_UAT_protestos_morosidades/model');
const EQFX_UAT_evolucion_deuda_sb_seps_sicom = require('../ApiCobrador/api/EQFX_UAT_evolucion_deuda_sb_seps_sicom/model');
const EQFX_UAT_detalle_deuda_actual_sb = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_actual_sb/model');
const EQFX_UAT_detalle_deuda_actual_seps = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_actual_seps/model');
const EQFX_UAT_detalle_deuda_actual_sicom = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_actual_sicom/model');
const EQFX_UAT_detalle_tarjetas = require('../ApiCobrador/api/EQFX_UAT_detalle_tarjetas/model');
const EQFX_UAT_distribucion_endeudamiento = require('../ApiCobrador/api/EQFX_UAT_distribucion_endeudamiento/model');
const EQFX_UAT_deuda_historica = require('../ApiCobrador/api/EQFX_UAT_deuda_historica/model');
const EQFX_UAT_estructura_vencimiento = require('../ApiCobrador/api/EQFX_UAT_estructura_vencimiento/model');
const EQFX_UAT_creditos_otorgados = require('../ApiCobrador/api/EQFX_UAT_creditos_otorgados/model');
const EQFX_UAT_saldos_por_vencer = require('../ApiCobrador/api/EQFX_UAT_saldos_por_vencer/model');
const EQFX_UAT_detalle_estructura_vencimiento = require('../ApiCobrador/api/EQFX_UAT_detalle_estructura_vencimiento/model');




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
            identificacion_consultada = [], /*1*/
            informacion_sri = [], /*2*/
            resumen_informe = [], /*3*/
            score_inclusion = [], /*4*/
            score = [], /*5*/
            score_sobreendeudamiento = [], /*6*/
            indicador_impacto_economico = [], /*7*/
            index_pymes = [], /*8 ESTA EN LA RESPUESTA PERO NO HAY DOCUMENTACION*/
            historico_score = [], /*9*/
            historico_acreedores = [], /*10*/
            historico_cuota_estimada = [], /*11*/
            historico_endeudamiento_comercial = [], /*12*/
            historico_endeudamiento_financiero = [], /*13*/
            historico_vencidos_comercial = [], /*14*/
            historico_vencidos_financiero = [], /*15*/
            valor_deuda_3_sistemas = [], /*16*/
            protestos_morosidades = [], /*17*/
            evolucion_deuda_sb_seps_sicom = [], /*18*/
            detalle_deuda_actual_sb = [], /*19*/
            detalle_deuda_actual_seps = [], /*20*/
            detalle_deuda_actual_sicom = [], /*21*/
            detalle_tarjetas = [], /*22*/
            distribucion_endeudamiento = [], /*23*/
            deuda_historica = [], /*24*/
            estructura_vencimiento = [], /*25*/
            creditos_otorgados = [], /*26*/
            saldos_por_vencer = [], /*27*/
            detalle_estructura_vencimiento = [],  /*28*/   
            cuota_estimada_mensual = [], /*29*/
            personas_inhabilitadas = [], /*30*/
            sujeto_al_dia = [], /*31*/
            mantiene_historial_crediticio = [], /*32*/
            identificador_perfil_riesgo_directo = [], /*33*/
            identificador_perfil_riesgo_directo_6_meses = [], /*34*/
            garantias_personales_codeudores_operaciones_vigentes = [], /*35*/
            garantias_personales_codeudores_operaciones_no_vigentes = [], /*36*/
            vinculaciones_instituciones_financieras = [], /*37*/
            operaciones_canceladas = [], /*38*/
            tarjetas_canceladas = [], /*39*/
            informacion_demografica = [], /*40*/
            mensaje_califica_detalle_tarjetas = [], /*41*/
            factores_influyen_score = [], /*42*/
            entidades_consultados = [], /*43*/
            detalle_deuda_historica_sb = [], /*44*/
            detalle_deuda_historica_seps = [], /*45*/
            detalle_deuda_historica_sicom = [] /*46*/

        } = reporteCrediticio;



        const segmentacionDTO = parseSegmentacion(interconnect.resultado_segmentacion || []);
        const politicasDTO = parseInterconnectResultadoPoliticas(interconnect.resultado_politicas || []);
        const resultadoDTO = parseInterconnectResultado(interconnect.resultado || []);
        const sriDTO = parseInformacionSRI(informacion_sri || []);
        const resumenInformeDTO = parseResumenInforme(resumen_informe || []);
        const scoreInclusionDTO = parseScoreInclusion(score_inclusion || []);
        const scoreDTO = parseScore(score || []);
        const scoreSobreendeudamientoDTO = parseScoreSobreendeudamiento(score_sobreendeudamiento || []);
        const indicadorImpactoEconomicoDTO = parseIndicadorImpactoEconomico(indicador_impacto_economico || []);
        const historicoScoreDTO = parseHistoricoScore(historico_score || []);
        const historicoAcreedoresDTO = parseHistoricoAcreedores(historico_acreedores || []);
        const historicoCuotaEstimadaDTO = parseHistoricoCuotaEstimada(historico_cuota_estimada || []);
        const historicoEndeudamientoComercialDTO = parseHistoricoEndeudamientoComercial(historico_endeudamiento_comercial || []);
        const historicoEndeudamientoFinancieroDTO = parseHistoricoEndeudamientoComercial(historico_endeudamiento_financiero || []);
        const historicoVencidosComercialDTO = parseHistoricoVencidosComercial(historico_vencidos_comercial || []);
        const historicoVencidosFinancieroDTO = parseHistoricoVencidosComercial(historico_vencidos_financiero || []); // Asegúrate de crear este DTO si es necesario
        const valorDeuda3SistemasDTO = parseValorDeuda3Sistemas(valor_deuda_3_sistemas || []);
        const protestosMorosidadesDTO = parseProtestosMorosidades(protestos_morosidades || []);
        const evolucionDeudaSBSEPSICOMDTO = parseEvolucionDeudaSBSEPSICOM(evolucion_deuda_sb_seps_sicom || []);
        const detalleDeudaActualSBDTO = parseDetalleDeudaActualSB(detalle_deuda_actual_sb || []);
        const detalleDeudaActualSepsDTO = parseDetalleDeudaActualSeps(detalle_deuda_actual_seps || []);
        const detalleDeudaActualSicomDTO = parseDetalleDeudaActualSicom(detalle_deuda_actual_sicom || []);
        const detalleTarjetasDTO = parseDetalleTarjetas(detalle_tarjetas || []);
        const distribucionEndeudamientoDTO = parseDistribucionEndeudamiento(distribucion_endeudamiento || []);
        const deudaHistoricaDTO = parseDeudaHistorica(deuda_historica || []);
        const estructuraVencimientoDTO = parseEstructuraVencimiento(estructura_vencimiento || []);
        const creditosOtorgadosDTO = parseCreditosOtorgados(creditos_otorgados || []);
        const saldosPorVencerDTO = parseSaldosPorVencer(saldos_por_vencer || []);
        const detalleEstructuraVencimientoDTO = parseDetalleEstructuraVencimiento(detalle_estructura_vencimiento || []);









        console.log("DTOs scoreSobreendeudamientoDTO:", {
          
            scoreSobreendeudamientoDTO
        });


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

        const repositoriesToSave = [
            { repo: EQFX_UAT_resultado_segmentacion, data: segmentacionDTO }, 
            { repo: EQFX_UAT_resultado_politicas, data: politicasDTO }, 
            { repo: EQFX_UAT_resultado, data: resultadoDTO }, 
            { repo: EQFX_UAT_informacion_sri, data: sriDTO }, /* 2*/
            { repo: EQFX_UAT_score_inclusion, data: scoreInclusionDTO }, /* 3 */
            { repo: EQFX_UAT_resumen_informe, data: resumenInformeDTO }, /* 4 */
            { repo: EQFX_UAT_score, data: scoreDTO }, /* 5 */
            { repo: EQFX_UAT_score_sobreendeudamiento, data: scoreSobreendeudamientoDTO }, /* 6 */
            { repo: EQFX_UAT_indicador_impacto_economico, data: indicadorImpactoEconomicoDTO }, /* 7 */
            { repo: EQFX_UAT_historico_score, data: historicoScoreDTO }, /* 9 */
            { repo: EQFX_UAT_historico_acreedores, data: historicoAcreedoresDTO }, /* 10 */
            { repo: EQFX_UAT_historico_cuota_estimada, data: historicoCuotaEstimadaDTO }, /* 11 */
            { repo: EQFX_UAT_historico_endeudamiento_comercial, data: historicoEndeudamientoComercialDTO }, /* 12 */
            { repo: EQFX_UAT_historico_endeudamiento_financiero, data: historicoEndeudamientoFinancieroDTO }, /* 13 */
            { repo: EQFX_UAT_historico_vencidos_comercial, data: historicoVencidosComercialDTO }, /* 14 */
            { repo: EQFX_UAT_historico_vencidos_financiero, data: historicoVencidosFinancieroDTO }, /* 15 */
            { repo: EQFX_UAT_valor_deuda_3_sistemas, data: valorDeuda3SistemasDTO }, /* 16 */
            { repo: EQFX_UAT_protestos_morosidades, data: protestosMorosidadesDTO }, /* 17 */
            { repo: EQFX_UAT_evolucion_deuda_sb_seps_sicom, data: evolucionDeudaSBSEPSICOMDTO }, /* 18 */
            { repo: EQFX_UAT_detalle_deuda_actual_sb, data: detalleDeudaActualSBDTO }, /* 19 */
            { repo: EQFX_UAT_detalle_deuda_actual_seps, data: detalleDeudaActualSepsDTO }, /* 20 */
            { repo: EQFX_UAT_detalle_deuda_actual_sicom, data: detalleDeudaActualSicomDTO }, /* 21 */
            { repo: EQFX_UAT_detalle_tarjetas, data: detalleTarjetasDTO }, /* 22 */
            { repo: EQFX_UAT_distribucion_endeudamiento, data: distribucionEndeudamientoDTO }, /* 23 */
            { repo: EQFX_UAT_deuda_historica, data: deudaHistoricaDTO }, /* 24 */
            { repo: EQFX_UAT_estructura_vencimiento, data: estructuraVencimientoDTO }, /* 25 */
            { repo: EQFX_UAT_creditos_otorgados, data: creditosOtorgadosDTO }, /* 26 */
            { repo: EQFX_UAT_saldos_por_vencer, data: saldosPorVencerDTO }, /* 27 */
            { repo: EQFX_UAT_detalle_estructura_vencimiento, data: detalleEstructuraVencimientoDTO }, /* 28 */
     
     
     
     
        ];

        for (const { repo, data } of repositoriesToSave) {
        
            if (!data || (Array.isArray(data) && data.length === 0)) {
                console.warn(`No hay datos para guardar en ${repo.name}`);
                continue;
            }
            const repository = AppDataSource.getRepository(repo);
            await saveDTODataIfExists(repository, data, 'idEQFX_IdentificacionConsultada', idEQFX_IdentificacionConsultada);
        }
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
