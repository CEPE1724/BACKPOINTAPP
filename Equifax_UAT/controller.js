const { AppDataSource } = require("../ApiCobrador/api/config/database");
const { parseSegmentacion } = require("./dto/interconnect/Segmentacion.dto");
const { parseInterconnectResultadoPoliticas } = require("./dto/interconnect/resultado_politicas.dto");
const { parseInterconnectResultado } = require("./dto/interconnect/resultado.dto");

const EQFX_IdentificacionConsultada = require('../Equifax/api/EQFX_IdentificacionConsultada/model');
const EQFX_UAT_resultado_segmentacion = require('../ApiCobrador/api/EQFX_UAT_resultado_segmentacion/model');
const EQFX_UAT_resultado_politicas = require('../ApiCobrador/api/EQFX_UAT_resultado_politicas/model');
const EQFX_UAT_resultado = require('../ApiCobrador/api/EQFX_UAT_resultado/model');
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
            detalle_deuda_actual_sb = []

        } = reporteCrediticio;

        console.log("Datos de reporte crediticio:", {
            identificacion_consultada,
            informacion_sri,
            resumen_informe
        });

        const segmentacionDTO = parseSegmentacion(interconnect.resultado_segmentacion || []);
        const politicasDTO = parseInterconnectResultadoPoliticas(interconnect.resultado_politicas || []);
        const resultadoDTO = parseInterconnectResultado(interconnect.resultado || []);

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
