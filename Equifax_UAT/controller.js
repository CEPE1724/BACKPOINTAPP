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
const { parseCreditosOtorgados } = require("./dto/reporteCrediticio/creditos_otorgados.dto");
const { parseSaldosPorVencer } = require("./dto/reporteCrediticio/saldos_por_vencer.dto");
const { parseDetalleEstructuraVencimiento } = require("./dto/reporteCrediticio/detalle_estructura_vencimiento.dto");
const { parseCuotaEstimadaMensual } = require("./dto/reporteCrediticio/cuota_estimada_mensual.dto");
const { parsePersonasInhabilitadas } = require("./dto/reporteCrediticio/personas_inhabilitadas.dto");
const { parseSujetoAlDia } = require("./dto/reporteCrediticio/sujeto_al_dia.dto");
const { parseMantieneHistorialCrediticio } = require("./dto/reporteCrediticio/mantiene_historial_crediticio.dto");
const { parseIdentificadorPerfilRiesgoDirecto } = require("./dto/reporteCrediticio/identificador_perfil_riesgo_directo.dto");
const { parseIdentificadorPerfilRiesgoDirecto6Meses } = require("./dto/reporteCrediticio/identificador_perfil_riesgo_directo_6_meses.dto");
const { parseGarantiasPersonalesCodeudoresOperacionesVigentes } = require("./dto/reporteCrediticio/garantias_personales_codeudores_operaciones_vigentes.dto");
const { parseGarantiasPersonalesCodeudoresOperacionesNoVigentes } = require("./dto/reporteCrediticio/garantias_personales_codeudores_operaciones_no_vigentes.dto");
const { parseVinculacionesInstitucionesFinancieras } = require("./dto/reporteCrediticio/vinculaciones_instituciones_financieras.dto");
const { parseOperacionesCanceladas } = require("./dto/reporteCrediticio/operaciones_canceladas.dto");
const { parseTarjetasCanceladas } = require("./dto/reporteCrediticio/tarjetas_canceladas.dto");
const { parseInformacionDemografica } = require("./dto/reporteCrediticio/informacion_demografica.dto");
const { parseMensajeCalificaDetalleTarjetas } = require("./dto/reporteCrediticio/mensaje_califica_detalle_tarjetas.dto");
const { parseFactoresInfluyenScore } = require("./dto/reporteCrediticio/factores_influyen_score.dto");
const { parseEntidadesConsultados } = require("./dto/reporteCrediticio/entidades_consultados.dto");
const { parseDetalleDeudaHistoricaSb } = require("./dto/reporteCrediticio/detalle_deuda_historica_sb.dto");
const { parseDetalleDeudaHistoricaSeps } = require("./dto/reporteCrediticio/detalle_deuda_historica_seps.dto");
const { parseDetalleDeudaHistoricaSicom } = require("./dto/reporteCrediticio/detalle_deuda_historica_sicom.dto");

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
const EQFX_UAT_cuota_estimada_mensual = require('../ApiCobrador/api/EQFX_UAT_cuota_estimada_mensual/model');
const EQFX_UAT_personas_inhabilitadas = require('../ApiCobrador/api/EQFX_UAT_personas_inhabilitadas/model');
const EQFX_UAT_sujeto_al_dia = require('../ApiCobrador/api/EQFX_UAT_sujeto_al_dia/model');
const EQFX_UAT_mantiene_historial_crediticio = require('../ApiCobrador/api/EQFX_UAT_mantiene_historial_crediticio/model');
const EQFX_UAT_identificador_perfil_riesgo_directo = require('../ApiCobrador/api/EQFX_UAT_identificador_perfil_riesgo_directo/model');
const EQFX_UAT_identificador_perfil_riesgo_directo_6_meses = require('../ApiCobrador/api/EQFX_UAT_identificador_perfil_riesgo_directo_6_meses/model');
const EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes = require('../ApiCobrador/api/EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes/model');
const EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes = require('../ApiCobrador/api/EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes/model');
const EQFX_UAT_vinculaciones_instituciones_financieras = require('../ApiCobrador/api/EQFX_UAT_vinculaciones_instituciones_financieras/model');
const EQFX_UAT_operaciones_canceladas = require('../ApiCobrador/api/EQFX_UAT_operaciones_canceladas/model');
const EQFX_UAT_tarjetas_canceladas = require('../ApiCobrador/api/EQFX_UAT_tarjetas_canceladas/model');
const EQFX_UAT_informacion_demografica = require('../ApiCobrador/api/EQFX_UAT_informacion_demografica/model');
const EQFX_UAT_mensaje_califica_detalle_tarjetas = require('../ApiCobrador/api/EQFX_UAT_mensaje_califica_detalle_tarjetas/model');
const EQFX_UAT_factores_influyen_score = require('../ApiCobrador/api/EQFX_UAT_factores_influyen_score/model');
const EQFX_UAT_entidades_consultados = require('../ApiCobrador/api/EQFX_UAT_entidades_consultados/model');
const EQFX_UAT_detalle_deuda_historica_sb = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_historica_sb/model');
const EQFX_UAT_detalle_deuda_historica_seps = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_historica_seps/model');
const EQFX_UAT_detalle_deuda_historica_sicom = require('../ApiCobrador/api/EQFX_UAT_detalle_deuda_historica_sicom/model');
const { getEquifaxToken } = require("../Equifax_UAT/services/equifaxToken.service");
const { executeEquifaxOrchestration } = require("../Equifax_UAT/services/equifaxOrchestration.service");
const { name } = require("ejs");
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

    // verificar si ya existe en la base de datos en el periodo actual auta =1
    const existingRecord = await AppDataSource.getRepository(EQFX_IdentificacionConsultada).findOneBy({
        TipoDocumento: tipoDocumento,
        NumeroDocumento: numeroDocumento,
        UAT: 1,
    });
    // CON LA FECHA SISTEMA VERIFICAR SI ESTA EN EL PEIRODO ACTUAL CON LA FECHA ACTUAL
    if (existingRecord) {
        const currentDate = new Date();
        const recordDate = new Date(existingRecord.FechaSistema);
        const isSameMonth = currentDate.getMonth() === recordDate.getMonth();
        const isSameYear = currentDate.getFullYear() === recordDate.getFullYear();
        if (isSameMonth && isSameYear) {
            /*status: 'success',
        success: true,
        data: transactionId,
        originalTransactionId*/
            return res.status(200).json({
                status: true,
                data: existingRecord.originalTransactionId,
                originalTransactionId: existingRecord.originalTransactionId,
                message: 'Consulta ya realizada en el periodo actual UAT'
            });
        }
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
            interconnectResponse, transactionId,
            originalTransactionId, integrante_facturacion = [],
            reporteCrediticio = {}
        } = orchestrationResponse;

        console.log("Orchestration response:", interconnectResponse);
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



        const segmentacionDTO = parseSegmentacion(interconnectResponse.resultado_segmentacion || []);
        const politicasDTO = parseInterconnectResultadoPoliticas(interconnectResponse.resultado_politicas || []);
        const resultadoDTO = parseInterconnectResultado(interconnectResponse.resultado || []);
        // const sriDTO = parseInformacionSRI(informacion_sri || []);
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
        const cuotaEstimadaMensualDTO = parseCuotaEstimadaMensual(cuota_estimada_mensual || []);
        const personasInhabilitadasDTO = parsePersonasInhabilitadas(personas_inhabilitadas || []);
        const sujetoAlDiaDTO = parseSujetoAlDia(sujeto_al_dia || []);
        const mantieneHistorialCrediticioDTO = parseMantieneHistorialCrediticio(mantiene_historial_crediticio || []);
        const identificadorPerfilRiesgoDirectoDTO = parseIdentificadorPerfilRiesgoDirecto(identificador_perfil_riesgo_directo || []);
        const identificadorPerfilRiesgoDirecto6MesesDTO = parseIdentificadorPerfilRiesgoDirecto6Meses(identificador_perfil_riesgo_directo_6_meses || []);
        const garantiasPersonalesCodeudoresOperacionesVigentesDTO = parseGarantiasPersonalesCodeudoresOperacionesVigentes(garantias_personales_codeudores_operaciones_vigentes || []);
        const garantiasPersonalesCodeudoresOperacionesNoVigentesDTO = parseGarantiasPersonalesCodeudoresOperacionesNoVigentes(garantias_personales_codeudores_operaciones_no_vigentes || []);
        const vinculacionesInstitucionesFinancierasDTO = parseVinculacionesInstitucionesFinancieras(vinculaciones_instituciones_financieras || []);
        const operacionesCanceladasDTO = parseOperacionesCanceladas(operaciones_canceladas || []);
        const tarjetasCanceladasDTO = parseTarjetasCanceladas(tarjetas_canceladas || []);
        const informacionDemograficaDTO = parseInformacionDemografica(informacion_demografica || []);
        const mensajeCalificaDetalleTarjetasDTO = parseMensajeCalificaDetalleTarjetas(mensaje_califica_detalle_tarjetas || []);
        const factoresInfluyenScoreDTO = parseFactoresInfluyenScore(factores_influyen_score || []);
        const entidadesConsultadosDTO = parseEntidadesConsultados(entidades_consultados || []);
        const detalleDeudaHistoricaSbDTO = parseDetalleDeudaHistoricaSb(detalle_deuda_historica_sb || []);
        const detalleDeudaHistoricaSepsDTO = parseDetalleDeudaHistoricaSeps(detalle_deuda_historica_seps || []);
        const detalleDeudaHistoricaSicomDTO = parseDetalleDeudaHistoricaSicom(detalle_deuda_historica_sicom || []);


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
            { repo: EQFX_UAT_resultado_segmentacion, data: segmentacionDTO, name: 'segmentacionDTO', name: 'segmentacionDTO' },
            { repo: EQFX_UAT_resultado_politicas, data: politicasDTO, name: 'politicasDTO', name: 'politicasDTO' },
            { repo: EQFX_UAT_resultado, data: resultadoDTO, name: 'resultadoDTO', name: 'resultadoDTO' },
            //{ repo: EQFX_UAT_informacion_sri, data: sriDTO, name: 'sriDTO', name: 'sriDTO' }, /* 2*/
            { repo: EQFX_UAT_score_inclusion, data: scoreInclusionDTO, name: 'scoreInclusionDTO', name: 'scoreInclusionDTO' }, /* 3 */
            { repo: EQFX_UAT_resumen_informe, data: resumenInformeDTO, name: 'resumenInformeDTO', name: 'resumenInformeDTO' }, /* 4 */
            { repo: EQFX_UAT_score, data: scoreDTO, name: 'scoreDTO', name: 'scoreDTO' }, /* 5 */
            { repo: EQFX_UAT_score_sobreendeudamiento, data: scoreSobreendeudamientoDTO, name: 'scoreSobreendeudamientoDTO', name: 'scoreSobreendeudamientoDTO' }, /* 6 */
            { repo: EQFX_UAT_indicador_impacto_economico, data: indicadorImpactoEconomicoDTO, name: 'indicadorImpactoEconomicoDTO', name: 'indicadorImpactoEconomicoDTO' }, /* 7 */
            { repo: EQFX_UAT_historico_score, data: historicoScoreDTO, name: 'historicoScoreDTO', name: 'historicoScoreDTO' }, /* 9 */
            { repo: EQFX_UAT_historico_acreedores, data: historicoAcreedoresDTO, name: 'historicoAcreedoresDTO', name: 'historicoAcreedoresDTO' }, /* 10 */
            { repo: EQFX_UAT_historico_cuota_estimada, data: historicoCuotaEstimadaDTO, name: 'historicoCuotaEstimadaDTO', name: 'historicoCuotaEstimadaDTO' }, /* 11 */
            { repo: EQFX_UAT_historico_endeudamiento_comercial, data: historicoEndeudamientoComercialDTO, name: 'historicoEndeudamientoComercialDTO', name: 'historicoEndeudamientoComercialDTO' }, /* 12 */
            { repo: EQFX_UAT_historico_endeudamiento_financiero, data: historicoEndeudamientoFinancieroDTO, name: 'historicoEndeudamientoFinancieroDTO', name: 'historicoEndeudamientoFinancieroDTO' }, /* 13 */
            { repo: EQFX_UAT_historico_vencidos_comercial, data: historicoVencidosComercialDTO, name: 'historicoVencidosComercialDTO' }, /* 14 */
            { repo: EQFX_UAT_historico_vencidos_financiero, data: historicoVencidosFinancieroDTO, name: 'historicoVencidosFinancieroDTO' }, /* 15 */
            { repo: EQFX_UAT_valor_deuda_3_sistemas, data: valorDeuda3SistemasDTO, name: 'valorDeuda3SistemasDTO' }, /* 16 */
            { repo: EQFX_UAT_protestos_morosidades, data: protestosMorosidadesDTO, name: 'protestosMorosidadesDTO' }, /* 17 */
            { repo: EQFX_UAT_evolucion_deuda_sb_seps_sicom, data: evolucionDeudaSBSEPSICOMDTO, name: 'evolucionDeudaSBSEPSICOMDTO' }, /* 18 */
            { repo: EQFX_UAT_detalle_deuda_actual_sb, data: detalleDeudaActualSBDTO, name: 'detalleDeudaActualSBDTO' }, /* 19 */
            { repo: EQFX_UAT_detalle_deuda_actual_seps, data: detalleDeudaActualSepsDTO, name: 'detalleDeudaActualSepsDTO' }, /* 20 */
            { repo: EQFX_UAT_detalle_deuda_actual_sicom, data: detalleDeudaActualSicomDTO, name: 'detalleDeudaActualSicomDTO' }, /* 21 */
            { repo: EQFX_UAT_detalle_tarjetas, data: detalleTarjetasDTO, name: 'detalleTarjetasDTO' }, /* 22 */
            { repo: EQFX_UAT_distribucion_endeudamiento, data: distribucionEndeudamientoDTO, name: 'distribucionEndeudamientoDTO' }, /* 23 */
            { repo: EQFX_UAT_deuda_historica, data: deudaHistoricaDTO, name: 'deudaHistoricaDTO' }, /* 24 */
            { repo: EQFX_UAT_estructura_vencimiento, data: estructuraVencimientoDTO, name: 'estructuraVencimientoDTO' }, /* 25 */
            { repo: EQFX_UAT_creditos_otorgados, data: creditosOtorgadosDTO, name: 'creditosOtorgadosDTO' }, /* 26 */
            { repo: EQFX_UAT_saldos_por_vencer, data: saldosPorVencerDTO, name: 'saldosPorVencerDTO' }, /* 27 */
            { repo: EQFX_UAT_detalle_estructura_vencimiento, data: detalleEstructuraVencimientoDTO, name: 'detalleEstructuraVencimientoDTO' }, /* 28 */
            { repo: EQFX_UAT_cuota_estimada_mensual, data: cuotaEstimadaMensualDTO, name: 'cuotaEstimadaMensualDTO' }, /* 29 */
            { repo: EQFX_UAT_personas_inhabilitadas, data: personasInhabilitadasDTO, name: 'personasInhabilitadasDTO' }, /* 30 */
            { repo: EQFX_UAT_sujeto_al_dia, data: sujetoAlDiaDTO, name: 'sujetoAlDiaDTO' }, /* 31 */
            { repo: EQFX_UAT_mantiene_historial_crediticio, data: mantieneHistorialCrediticioDTO, name: 'mantieneHistorialCrediticioDTO' }, /* 32 */
            { repo: EQFX_UAT_identificador_perfil_riesgo_directo, data: identificadorPerfilRiesgoDirectoDTO, name: 'identificadorPerfilRiesgoDirectoDTO' }, /* 33 */
            { repo: EQFX_UAT_identificador_perfil_riesgo_directo_6_meses, data: identificadorPerfilRiesgoDirecto6MesesDTO, name: 'identificadorPerfilRiesgoDirecto6MesesDTO' }, /* 34 */
            { repo: EQFX_UAT_garantias_personales_codeudores_operaciones_vigentes, data: garantiasPersonalesCodeudoresOperacionesVigentesDTO, name: 'garantiasPersonalesCodeudoresOperacionesVigentesDTO' }, /* 35 */
            { repo: EQFX_UAT_garantias_personales_codeudores_operaciones_no_vigentes, data: garantiasPersonalesCodeudoresOperacionesNoVigentesDTO, name: 'garantiasPersonalesCodeudoresOperacionesNoVigentesDTO' }, /* 36 */
            { repo: EQFX_UAT_vinculaciones_instituciones_financieras, data: vinculacionesInstitucionesFinancierasDTO, name: 'vinculacionesInstitucionesFinancierasDTO' }, /* 37 */
            { repo: EQFX_UAT_operaciones_canceladas, data: operacionesCanceladasDTO, name: 'operacionesCanceladasDTO' }, /* 38 */
            { repo: EQFX_UAT_tarjetas_canceladas, data: tarjetasCanceladasDTO, name: 'tarjetasCanceladasDTO' }, /* 39 */
            { repo: EQFX_UAT_informacion_demografica, data: informacionDemograficaDTO, name: 'informacionDemograficaDTO' }, /* 40 */
            { repo: EQFX_UAT_mensaje_califica_detalle_tarjetas, data: mensajeCalificaDetalleTarjetasDTO, name: 'mensajeCalificaDetalleTarjetasDTO' }, /* 41 */
            { repo: EQFX_UAT_factores_influyen_score, data: factoresInfluyenScoreDTO, name: 'factoresInfluyenScoreDTO' }, /* 42 */
            { repo: EQFX_UAT_entidades_consultados, data: entidadesConsultadosDTO, name: 'entidadesConsultadosDTO' }, /* 43 */
            { repo: EQFX_UAT_detalle_deuda_historica_sb, data: detalleDeudaHistoricaSbDTO, name: 'detalleDeudaHistoricaSbDTO' }, /* 44 */
            { repo: EQFX_UAT_detalle_deuda_historica_seps, data: detalleDeudaHistoricaSepsDTO, name: 'detalleDeudaHistoricaSepsDTO' }, /* 45 */
            { repo: EQFX_UAT_detalle_deuda_historica_sicom, data: detalleDeudaHistoricaSicomDTO, name: 'detalleDeudaHistoricaSicomDTO' } /* 46 */
        ];

        for (const { repo, data, name } of repositoriesToSave) {

            if (!data || (Array.isArray(data) && data.length === 0)) {
                console.warn(`No hay datos para guardar en ${name}`);
                continue;
            }
            // capturara le nombre del repositorio
            console.log(`Guardando datos en ${name}...`);
            const repository = AppDataSource.getRepository(repo);
            await saveDTODataIfExists(repository, data, 'idEQFX_IdentificacionConsultada', idEQFX_IdentificacionConsultada);
            console.log("ideqfx", idEQFX_IdentificacionConsultada);
            console.log(`Datos guardados en ${name} correctamente.`);
        }
        return res.status(200).json({
            status: 'success',
            success: true,
            data: transactionId,
            originalTransactionId
        });

    } catch (error) {
        console.error("Error en equifaxOauth:", error.message || error);
        return res.status(500).json({
            status: 'error',
            success: false,
            message: 'Error interno del servidor',
            data: null
        });
    }
};


async function saveDTODataIfExists(repository, dtoData, foreignKeyName, foreignKeyValue, chunkSize = 50) {

    if (!dtoData || (Array.isArray(dtoData) && dtoData.length === 0)) return;

    const createEntity = item => repository.create({ [foreignKeyName]: foreignKeyValue, ...item });

    const dataToSave = Array.isArray(dtoData)
        ? dtoData.map(createEntity)
        : [createEntity(dtoData)];


    for (let i = 0; i < dataToSave.length; i += chunkSize) {
        const chunk = dataToSave.slice(i, i + chunkSize);
        await repository.save(chunk);
    }


    // No imprimo todo el JSON para evitar logs gigantes si son muchos
}
