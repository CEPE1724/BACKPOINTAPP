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
            index_pymes = [], /*8*/
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
        ];

        for (const { repo, data } of repositoriesToSave) {
            console.log(`Guardando datos en ${repo.name}:`, data);
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
