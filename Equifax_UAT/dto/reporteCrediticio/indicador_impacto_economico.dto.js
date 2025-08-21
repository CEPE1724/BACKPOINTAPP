/*
"indicador_impacto_economico": [
{
"indicador": "1",
"ingreso": 1313,
"cuota_financiera": 445.35
}
],*/

/** * DTO for Resumen Informe
 * @param {Array} resumenInforme - Array of resumenInforme objects
 * @returns {Array} - Array of parsed resumenInforme DTOs
    * @typedef {Object} IndicadorImpactoEconomicoDTO
    * @property {string} indicador - Indicador de impacto económico
    * @property {number} ingreso - Ingreso asociado al indicador
    * @property {number} cuota_financiera - Cuota financiera asociada al indicador
    *   
    * @returns {IndicadorImpactoEconomicoDTO[]}
    * */
function parseIndicadorImpactoEconomico(indicador_impacto_economico = []) {
    if (!Array.isArray(indicador_impacto_economico) || indicador_impacto_economico.length === 0) {
        return [];
    }

    return indicador_impacto_economico.map(item => ({
        indicador: item.indicador || '',
        ingreso: Number(item.ingreso) || 0,
        cuota_financiera: Number(item.cuota_financiera) || 0,
    }));
}

module.exports = { parseIndicadorImpactoEconomico };