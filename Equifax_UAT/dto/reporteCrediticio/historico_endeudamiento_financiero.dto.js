/*"historico_endeudamiento_financiero": [
{
"retroactivo": "Actual",
"saldo_total": 2909.38
},
{
"retroactivo": "-6 Meses",
"saldo_total": 3459.96
},
{
"retroactivo": "-12 Meses",
"saldo_total": 5052.63
}
],*/

/** * DTO for Historico Endeudamiento Financiero
 * @param {Array} historico_endeudamiento_financiero - Array of histor
 * * @returns {Array} - Array of parsed historico_endeudamiento_financiero DTOs
 * @typedef {Object} HistoricoEndeudamientoFinancieroDTO
 * * @property {string} retroactivo - Retroactivo del registro
 * * @property {number} saldo_total - Saldo total
 * * @returns {HistoricoEndeudamientoFinancieroDTO[]}
 * */
function parseHistoricoEndeudamientoFinanciero(historico_endeudamiento_financiero = []) {

    if (!Array.isArray(historico_endeudamiento_financiero) || historico_endeudamiento_financiero.length === 0) {
        return [];
    }
    return historico_endeudamiento_financiero.map(item => ({
        retroactivo: item.retroactivo,
        saldo_total: item.saldo_total
    }));
}
module.exports = { parseHistoricoEndeudamientoFinanciero };
