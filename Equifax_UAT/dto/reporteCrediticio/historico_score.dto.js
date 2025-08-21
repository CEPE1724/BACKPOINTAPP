/*"historico_score": [
{
"retroactivo": "Actual",
"score": 987,
"g_min": 869,
"g_max": 999,
"y_min": 415,
"y_max": 868,
"r_min": 1,
"r_max": 414
},*/

/** * DTO for Historico Score
 * @param {Array} historico_score - Array of historico_score objects
 * * @returns {Array} - Array of parsed historico_score DTOs
 * @typedef {Object} HistoricoScoreDTO
 * * @property {string} retroactivo - Retroactivo del score
 * * @property {number} score - Valor del score
 * * @property {number} g_min - Valor mínimo de la categoría G
 * * @property {number} g_max - Valor máximo de la categoría G
 * * @property {number} y_min - Valor mínimo de la categoría Y
 * * @property {number} y_max - Valor máximo de la categoría Y
 * * @property {number} r_min - Valor mínimo de la categoría R
 * * @property {number} r_max - Valor máximo de la categoría R
 * * @returns {HistoricoScoreDTO[]}
 * */
function parseHistoricoScore(historico_score = []) {
    if (!Array.isArray(historico_score) || historico_score.length === 0) {
        return [];
    }

    return historico_score.map(item => ({
        retroactivo: item.retroactivo || '',
        score: Number(item.score) || 0,
        g_min: Number(item.g_min) || 0.00,
        g_max: Number(item.g_max) || 0.00,
        y_min: Number(item.y_min) || 0.00,
        y_max: Number(item.y_max) || 0.00,
        r_min: Number(item.r_min) || 0.00,
        r_max: Number(item.r_max) || 0.00,
    }));
}

module.exports = { parseHistoricoScore };