/*{
"orden": 3,
"retroactivo": "Actual",
"cuota_mensual": 445.35
},
{
"orden": 2,
"retroactivo": "-6 Meses",
"cuota_mensual": 470.32
},*/

/** * DTO for Historico Cuota Estimada
 * @param {Array} historico_cuota_estimada - Array of historico_c
 * * @returns {Array} - Array of parsed historico_cuota_estimada DTOs
 * @typedef {Object} HistoricoCuotaEstimadaDTO
 * * @property {number} orden - Orden del registro
 * * @property {string} retroactivo - Retroactivo del registro
 * * @property {number} cuota_mensual - Cuota mensual estimada
 * * @returns {HistoricoCuotaEstimadaDTO[]}
 * */
function parseHistoricoCuotaEstimada(historico_cuota_estimada = []) {
    if (!Array.isArray(historico_cuota_estimada) || historico_cuota_estimada.length === 0) {
        return [];
    }
    return historico_cuota_estimada.map(item => ({
        orden: item.orden,
        retroactivo: item.retroactivo,
        cuota_mensual: item.cuota_mensual
    }));
}
module.exports = { parseHistoricoCuotaEstimada };
