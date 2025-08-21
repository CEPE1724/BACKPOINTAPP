/*"score_inclusion": [
{
"score": 894,
"total_acum": 80,
"tasa_de_malos_acum": 8.3,
"score_min": 874,
"score_max": 894,
"fecha_inicial": "2016-01-31",
"fecha_final": "2018-12-31"
}
],*/

/** * DTO for Resumen Informe
 * @module Equifax_UAT/dto/reporteCrediticio/score_inclusion.dto.js
 * @typedef {Object} ScoreInclusionDTO
 * * @property {number} score - Puntaje del score de inclusión
 * @property {number} total_acum - Total acumulado
 * @property {number} tasa_de_malos_acum - Tasa de malos acumulada
 * @property {number} score_min - Puntaje mínimo
 * @property {number} score_max - Puntaje máximo
 * @property {string} fecha_inicial - Fecha inicial del score
 * * @property {string} fecha_final - Fecha final del score
 * */
function parseScoreInclusion(score_inclusion) {
    if (!Array.isArray(score_inclusion) || score_inclusion.length === 0) {
        return [];
    }

    return score_inclusion.map(item => ({
        score: item.score || 0,
        total_acum: item.total_acum || 0.00,
        tasa_de_malos_acum: item.tasa_de_malos_acum || 0.00,
        score_min: item.score_min || 0,
        score_max: item.score_max || 0,
        fecha_inicial: item.fecha_inicial ? new Date(item.fecha_inicial) : null,
        fecha_final: item.fecha_final ? new Date(item.fecha_final) : null
    }));
}
module.exports = { parseScoreInclusion };
