/**
 * @typedef {Object} ScoreDTO
 * @property {number} score - Puntaje del score
 * @property {number} total_acum - Total acumulado
 * @property {number} tasa_de_malos_acum - Tasa de malos acumulada
 * @property {number} score_min - Puntaje mínimo
 * @property {number} score_max - Puntaje máximo
 * @property {Date|null} fecha_inicial - Fecha inicial del score
 * @property {Date|null} fecha_final - Fecha final del score
 */

/**
 * Convierte un string en fecha o null si es inválida
 * @param {string} value
 * @returns {Date|null}
 */
function parseDateOrNull(value) {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
}

/**
 * Parsea un arreglo de objetos score
 * @param {Array<Object>} score
 * @returns {ScoreDTO[]}
 */
function parseScore(score = []) {
    if (!Array.isArray(score) || score.length === 0) return [];

    return score.map(item => ({
        score: Number(item.score) || 0,
        total_acum: Number(item.total_acum) || 0,
        tasa_de_malos_acum: Number(item.tasa_de_malos_acum) || 0,
        score_min: Number(item.score_min) || 0,
        score_max: Number(item.score_max) || 0,
        fecha_inicial: parseDateOrNull(item.fecha_inicial),
        fecha_final: parseDateOrNull(item.fecha_final)
    }));
}

module.exports = { parseScore };
