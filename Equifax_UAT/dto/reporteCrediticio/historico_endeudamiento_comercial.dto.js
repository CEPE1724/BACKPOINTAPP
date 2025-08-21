/*"historico_endeudamiento_comercial": [
{
"retroactivo": "Actual",
"saldo_total": 0
},
{
"retroactivo": "-6 Meses",
"saldo_total": 0
},
{
"retroactivo": "-12 Meses",
"saldo_total": 0
}
],*/

/** * DTO for Historico Endeudamiento Comercial
 * @param {Array} historico_endeudamiento_comercial - Array of historico
 * * @returns {Array} - Array of parsed historico_endeudamiento_comercial DTOs
 * @typedef {Object} HistoricoEndeudamientoComercialDTO
 * * @property {string} retroactivo - Retroactivo del registro
 * * @property {number} saldo_total - Saldo total
 * * @returns {HistoricoEndeudamientoComercialDTO[]}
 * */
function parseHistoricoEndeudamientoComercial(historico_endeudamiento_comercial = []) {
    if (!Array.isArray(historico_endeudamiento_comercial) || historico_endeudamiento_comercial.length === 0) {
        return [];
    }
    return historico_endeudamiento_comercial.map(item => ({
        retroactivo: item.retroactivo,
        saldo_total: item.saldo_total
    }));
}
module.exports = { parseHistoricoEndeudamientoComercial };
