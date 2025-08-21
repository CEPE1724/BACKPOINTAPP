/*"historico_acreedores": [
{
"retroactivo": "Actual",
"acreedores": 1
},
{
"retroactivo": "-6 Meses",
"acreedores": 2
},*/


/** * DTO for Historico Acreedores
 * @param {Array} historico_acreedores - Array of historico_acreedores
 * * @returns {Array} - Array of parsed historico_acreedores DTOs
 * @typedef {Object} HistoricoAcreedoresDTO
 * * @property {string} retroactivo - Retroactivo del registro
 * * @property {number} acreedores - Número de acreedores
 * * @returns {HistoricoAcreedoresDTO[]}
 * */
function parseHistoricoAcreedores(historico_acreedores = []) {
    if (!Array.isArray(historico_acreedores) || historico_acreedores.length === 0) {
        return [];
    }

    return historico_acreedores.map(item => ({
        retroactivo: item.retroactivo || '',
        acreedores: Number(item.acreedores) || 0,
    }));
}
module.exports = { parseHistoricoAcreedores };